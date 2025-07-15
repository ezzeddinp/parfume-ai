// utils/shipping.ts
const allowedShippingRates: Record<string, number> = {
  "DKI Jakarta": 10000,
  "Jawa Barat": 20000,
  "Jawa Tengah": 25000,
  "DI Yogyakarta": 25000,
  "Jawa Timur": 30000,
  "Luar Jawa": 50000,
};

export function getShippingCostByProvince(province: string): number {
  return allowedShippingRates[province] ?? 50000;
}
 