import { useSearchParams } from "next/navigation"

export default function SuccessPage({ params }: { params: { orderId: string } }) {
  const searchParams = useSearchParams()
  const status = searchParams.get("status")
  console.log("✅ Rendering SuccessPage with orderId:", params.orderId)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Pembayaran Berhasil ✅</h1>
      <p><strong>Order ID:</strong> {params.orderId}</p>
      <p><strong>Status:</strong> {status}</p>
    </div>
  )
}
