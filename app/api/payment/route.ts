import { NextRequest, NextResponse } from "next/server";
import Midtrans from "midtrans-client";
import _ from "lodash";
import { getShippingCostByProvince } from "@/lib/shipping";

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY || "",
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "",
});

export async function POST(req: NextRequest) {
  try {
    const { items, customer, total } = await req.json();

    // Validate input
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Items data not found" },
        { status: 400 }
      );
    }
    if (!customer) {
      return NextResponse.json(
        { error: "Customer data not found" },
        { status: 400 }
      );
    }

    // Map items to Midtrans format
    const itemDetails = items.map((item: any) => ({
      id: item.id,
      name: item.name,
      price: Number(item.price),
      quantity: Number(item.quantity),
    }));

    // Tambahkan ongkir dari provinsi
    const validatedShipping = getShippingCostByProvince(customer.province);


    itemDetails.push({
      id: "ONGKIR",
      name: "Biaya Pengiriman",
      price: validatedShipping,
      quantity: 1,
    });

    if (!total || total <= 0) {
      return NextResponse.json(
        { error: "Total amount is invalid" },
        { status: 400 }
      );
    }

    // Calculate gross amount
    const grossAmount = _.sumBy(
      itemDetails,
      (item: any) => item.price * item.quantity
    );

    // Validate gross amount
    if (grossAmount <= 0) {
      return NextResponse.json(
        { error: "Invalid gross amount" },
        { status: 400 }
      );
    }

    // Prepare customer details
    const customerDetails = {
      first_name: customer.firstName,
      last_name: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      billing_address: {
        first_name: customer.firstName,
        last_name: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        postal_code: customer.postalCode,
        country_code: "IDN",
      },
      shipping_address: {
        first_name: customer.firstName,
        last_name: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        postal_code: customer.postalCode,
        country_code: "IDN",
      },
    };

    // Prepare transaction parameters
    const transactionParams = {
      transaction_details: {
        order_id: `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        gross_amount: grossAmount,
      },
      item_details: itemDetails,
      customer_details: customerDetails,
      metadata: {
        user_id: customer.user_id,
        items: items,
      },
    };

    // Create transaction token
    const token = await snap.createTransactionToken(transactionParams);

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create transaction",
      },
      { status: 500 }
    );
  }
}
