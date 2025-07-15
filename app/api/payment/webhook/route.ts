import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";
import { z } from "zod";

// Supabase init
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Define schema with zod
const WebhookPayloadSchema = z.object({
  order_id: z.string(),
  status_code: z.string(),
  gross_amount: z.string(),
  transaction_status: z.string(),
  fraud_status: z.string().optional(),
  metadata: z.object({
    user_id: z.string(),
    items: z.array(
      z.object({
        id: z.string(),
        price: z.number(),
        name: z.string().optional(),
        quantity: z.number().optional(),
      })
    ),
  }),
});

export async function POST(req: NextRequest) {
  try {
    const signatureKey = req.headers.get("x-callback-signature") || "";
    const body = await req.json();

    // Type check using Zod
    const parsed = WebhookPayloadSchema.safeParse(body);
    if (!parsed.success) {
      console.error("Invalid payload:", parsed.error.flatten());
      return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
    }

    const {
      order_id,
      status_code,
      gross_amount,
      transaction_status,
      fraud_status,
      metadata,
    } = parsed.data;

    // Signature verification
    const expectedSignature = crypto
      .createHash("sha512")
      .update(order_id + status_code + gross_amount + process.env.MIDTRANS_SERVER_KEY!)
      .digest("hex");

    if (signatureKey !== expectedSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 403 });
    }

    // Check duplicate order_id
    const { data: existing, error: findError } = await supabase
      .from("transactions")
      .select("order_id")
      .eq("order_id", order_id)
      .single();

    if (existing) {
      return NextResponse.json({ message: "Order already exists" }, { status: 200 }); // Still respond 200 to Midtrans
    }

    // Determine transaction outcome
    let status: "success" | "pending" | "failed" = "pending";

    if (
      transaction_status === "settlement" ||
      (transaction_status === "capture" && fraud_status === "accept")
    ) {
      status = "success";
    } else if (["cancel", "deny", "expire"].includes(transaction_status)) {
      status = "failed";
    }

    const firstItem = metadata.items[0];

    // Insert into transactions
    const { error: insertError } = await supabase.from("transactions").insert({
      order_id,
      user_id: metadata.user_id,
      product_id: firstItem.id,
      price: firstItem.price,
      status,
      total_amount: gross_amount,
      order_items: metadata.items,
    });

    if (insertError) {
      console.error("Insert error:", insertError.message);
      return NextResponse.json({ error: "Failed to store transaction" }, { status: 500 });
    }

    // Optional: Insert raw webhook payload into logs table
    await supabase.from("webhook_logs").insert({
      source: "midtrans",
      order_id,
      payload: body,
      received_at: new Date().toISOString(),
    });

    return NextResponse.json({ message: "OK" }); // Always 200 to Midtrans
  } catch (err) {
    console.error("Unhandled webhook error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
