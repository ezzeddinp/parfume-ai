import { NextResponse, NextRequest } from "next/server";
import Midtrans from "midtrans-client";
import _ from "lodash";

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY || "",
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "",
});

export async function POST(req: NextRequest) {
  const data = await req.json();

  if (!data || data.length === 0) {
    throw new Error("data not found");
  }

  const itemDetails = data.map((item: any) => {
    return {
      key: item.id,
      id: item.id,
      name: item.name,
      price: _.ceil(parseFloat(item.price.toString())),
      quantity: item.quantity,
    };
  });

  const grossAmount = _.sumBy(
    itemDetails,
    (item) => item.price * item.quantity
  );

  const parameter = {
    item_details: itemDetails,
    transaction_details: {
      order_id: `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`, // fixed!
      gross_amount: grossAmount,
    },
  };

  const token = await snap.createTransactionToken(parameter);
  return NextResponse.json({
    token,
  });
}
