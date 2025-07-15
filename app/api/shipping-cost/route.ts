// route.ts
import { NextRequest, NextResponse } from "next/server";
import { getShippingCostByProvince } from "@/lib/shipping";

export async function POST(req: NextRequest) {
  const { province } = await req.json();

  const shippingCost = getShippingCostByProvince(province);

  return NextResponse.json({ shippingCost });
}
