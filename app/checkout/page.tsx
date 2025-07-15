
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CreditCard, MapPin, User, ShoppingBag, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import { supabase } from "@/utils/supabase/client"

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [shipping, setShipping] = useState(0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    province: "",
    notes: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load items from localStorage
    const checkoutItems = localStorage.getItem("checkoutItems")
    if (checkoutItems) {
      setCartItems(JSON.parse(checkoutItems))
    }
    console.log("data yg dikirim ke payment",checkoutItems);

    // Load Midtrans Snap
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
    if (!clientKey) {
      console.error("NEXT_PUBLIC_MIDTRANS_CLIENT_KEY not set")
      return
    }

    const script = document.createElement("script")
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js"
    script.setAttribute("data-client-key", clientKey)
    script.async = true
    script.onload = () => console.log("Midtrans Snap loaded")
    script.onerror = () => console.error("Failed to load Midtrans Snap")
    document.head.appendChild(script)

    return () => {
      const existingScript = document.querySelector('script[src*="snap.js"]')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [])

  useEffect(() => {
  const fetchShippingCost = async () => {
    if (!formData.province) return;

    try {
      const res = await fetch("/api/shipping-cost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ province: formData.province }),
      });

      const data = await res.json();
      setShipping(data.shippingCost);
    } catch (err) {
      console.error("Gagal ambil ongkir:", err);
      setShipping(50000); // fallback
    }
  };

  fetchShippingCost();
}, [formData.province]);


  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal + shipping

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isSnapReady = () => typeof window !== "undefined" && (window as any).snap

const validateForm = () => {
  const required = ["firstName", "lastName", "email", "phone", "address", "city", "postalCode", "province"]
  const missing = required.filter((key) => !formData[key as keyof typeof formData]?.trim())
  return missing
}

const handlePayment = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    window.location.href = "/login";
    return;
  }

  if (!isSnapReady()) {
    alert("Midtrans belum siap, mohon tunggu sebentar...");
    return;
  }

  if (cartItems.length === 0) {
    alert("Keranjang belanja kamu kosong.");
    return;
  }

  const missingFields = validateForm();
  if (missingFields.length > 0) {
    alert(`Harap isi semua kolom wajib: ${missingFields.join(", ")}`);
    return;
  }

  setIsLoading(true);

  try {
    const res = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        customer: {
          ...formData,
          shippingCost: shipping
        },
        total: total
      }),
    });

    
    const data = await res.json();

    if (!res.ok || !data?.token) {
      throw new Error(data?.error || "Token pembayaran tidak tersedia.");
    }

    const snap = (window as any).snap;
    

    snap.pay(data.token, {
      onSuccess: async (result: any) => {
        console.log("✅ Sukses:", result);
        localStorage.removeItem("checkoutItems");

        // Step 1: Insert transaksi
        const { data: trxData, error: trxError } = await supabase
          .from("transactions")
          .insert({
            order_id: result.order_id,
            user_id: user.id,
            product_id: cartItems[0]?.id || null, // ambil product pertama aja
            price: cartItems[0]?.price || null,
            status: result.transaction_status,
            total_amount: total,
            order_items: cartItems,
          })
          .select("id") // Ambil ID buat insert ke detail
          .single();

        if (trxError) {
          console.error("❌ Gagal insert transaksi:", trxError);
          return;
        }

        const transaction_id = trxData.id;

        // Step 2: Insert detail transaksi
        const { error: detailError } = await supabase
          .from("transaction_details")
          .insert({
            transaction_id,
            email: formData.email,
            customer_name: `${formData.firstName} ${formData.lastName}`,
            address: formData.address,
            city: formData.city,
            province: formData.province,
            postal_code: formData.postalCode,
            phone: formData.phone,
            notes: formData.notes,
          });

        if (detailError) {
          console.error("❌ Gagal insert detail transaksi:", detailError);
        }

        // Redirect
        window.location.href = `/success`;
      },

      onPending: (result: any) => {
        console.log("🕒 Pending:", result);
        window.location.href = `/payment/pending?orderId=${result.order_id}&status=pending`;
      },

      onError: (result: any) => {
        console.error("❌ Error:", result);
        window.location.href = `/payment/error?orderId=${result.order_id}&error=${encodeURIComponent(JSON.stringify(result))}`;
      },

      onClose: () => {
        alert("Pembayaran dibatalkan oleh pengguna.");
      },
    });
  } catch (err: any) {
    console.error("🛑 Payment error:", err);
    alert(`Gagal melakukan pembayaran: ${err.message || "Unknown error"}`);
  } finally {
    setIsLoading(false);
  }
};



  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-400 mb-6">Add some products to your cart to proceed with checkout.</p>
          <Button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-full">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-20">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-3xl lg:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            Checkout
          </h1>
        </motion.div>

        {/* Safety Warning */}
        <Card className="bg-red-900/30 border-red-700 rounded-xl mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              <div>
                <p className="text-red-400 font-bold text-lg">⚠️ SANDBOX TEST MODE</p>
                <p className="text-red-300 text-sm mb-2">
                  <strong>DO NOT USE REAL PAYMENT METHODS!</strong>
                </p>
                <p className="text-red-300 text-sm">
                  • Use test card: 4811 1111 1111 1114 • Avoid real e-wallets • Amount fixed at Rp 10,000
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Checkout Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* Customer Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="bg-gray-800/50 border-gray-700 rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <User className="mr-2 h-5 w-5 text-blue-400" />
                    Informasi Pelanggan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-300">Nama Depan *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="bg-gray-900 border-gray-600 text-white rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-300">Nama Belakang *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="bg-gray-900 border-gray-600 text-white rounded-lg"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-300">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-gray-900 border-gray-600 text-white rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-300">Nomor Telepon *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-gray-900 border-gray-600 text-white rounded-lg"
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Shipping Address */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="bg-gray-800/50 border-gray-700 rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-white">
                    <MapPin className="mr-2 h-5 w-5 text-blue-400" />
                    Alamat Pengiriman
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address" className="text-gray-300">Alamat *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="bg-gray-900 border-gray-600 text-white rounded-lg min-h-[80px]"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-gray-300">Kota *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="bg-gray-900 border-gray-600 text-white rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="province" className="text-gray-300">Provinsi *</Label>
                      <Select value={formData.province} onValueChange={(value) => handleInputChange("province", value)}>
                        <SelectTrigger className="bg-gray-900 border-gray-600 text-white">
                          <SelectValue placeholder="Pilih Provinsi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DKI Jakarta">DKI Jakarta</SelectItem>
                          <SelectItem value="Jawa Barat">Jawa Barat</SelectItem>
                          <SelectItem value="Jawa Tengah">Jawa Tengah</SelectItem>
                          <SelectItem value="Jawa Timur">Jawa Timur</SelectItem>
                          <SelectItem value="Bali">Bali</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="postalCode" className="text-gray-300">Kode Pos *</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange("postalCode", e.target.value)}
                        className="bg-gray-900 border-gray-600 text-white rounded-lg"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes" className="text-gray-300">Catatan Pesanan (Opsional)</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      className="bg-gray-900 border-gray-600 text-white rounded-lg min-h-[60px]"
                      rows={2}
                      placeholder="Instruksi khusus untuk pengiriman..."
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <Card className="bg-gray-800/50 border-gray-700 rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <ShoppingBag className="mr-2 h-5 w-5 text-blue-400" />
                  Ringkasan Pesanan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=60&width=60&text=Item"
                      }}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{item.name}</h4>
                      <p className="text-gray-400 text-sm">Jumlah: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-white">
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </p>
                  </div>
                ))}
                <div className="border-t border-gray-600 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal:</span>
                    <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Pengiriman:</span>
                    <span>Rp {shipping.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-white border-t border-gray-600 pt-2">
                    <span>Total:</span>
                    <span>Rp {total.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="text-center text-yellow-400 text-sm mt-2">⚠️ Jumlah tes: Rp 10,000</div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Button */}
            <Card className="bg-gray-800/50 border-gray-700 rounded-xl">
              <CardContent className="p-6">
                <Link href="/test-payment" className="block mb-4">
                  <Button
                    variant="outline"
                    className="w-full border-blue-600 text-blue-400 hover:bg-blue-900/20 bg-transparent rounded-full"
                  >
                    📖 Baca Panduan Pengujian Aman
                  </Button>
                </Link>
                <Button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-full text-lg py-3"
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  {isLoading ? "Memproses..." : "Bayar dengan Midtrans (Sandbox)"}
                </Button>
                <p className="text-center text-gray-400 text-sm mt-4">🧪 Pembayaran sandbox - Aman untuk pengujian</p>
                <div className="flex justify-center space-x-2 mt-2">
                  <div className="bg-blue-600 rounded px-2 py-1">
                    <span className="text-white text-xs font-bold">GoPay</span>
                  </div>
                  <div className="bg-red-600 rounded px-2 py-1">
                    <span className="text-white text-xs font-bold">OVO</span>
                  </div>
                  <div className="bg-blue-800 rounded px-2 py-1">
                    <span className="text-white text-xs font-bold">DANA</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
