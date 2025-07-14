import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

// Supabase init
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const signatureKey = req.headers.get("x-callback-signature") || "";
    const body = await req.json();

    const {
      order_id,
      status_code,
      gross_amount,
      transaction_status,
      metadata,
    } = body;

    const expectedSignature = crypto
      .createHash("sha512")
      .update(order_id + status_code + gross_amount + process.env.MIDTRANS_SERVER_KEY!)
      .digest("hex");

    if (signatureKey !== expectedSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 403 });
    }

    // Cek metadata & user_id
    if (!metadata?.user_id || !Array.isArray(metadata?.items)) {
      return NextResponse.json({ error: "Missing metadata or user ID" }, { status: 400 });
    }

    // Ambil salah satu product_id dari items (asumsi minimal 1 produk)
    const firstItem = metadata.items[0];
    const product_id = firstItem?.id || null;
    const price = firstItem?.price || null;

    // Insert ke tabel transactions
    const { error } = await supabase.from("transactions").insert({
      order_id: order_id,
      user_id: metadata.user_id,
      product_id: product_id,
      price: price,
      status: transaction_status,
      total_amount: gross_amount,
      order_items: metadata.items, // JSON array of all items
    });

    if (error) {
      console.error("Supabase insert error:", error.message);
      return NextResponse.json({ error: "Failed to store transaction" }, { status: 500 });
    }

    return NextResponse.json({ message: "Transaction stored successfully" });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
