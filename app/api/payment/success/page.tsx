export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Pembayaran Berhasil ✅</h1>
      <p><strong>Order ID:</strong> INV123456</p>
      <p><strong>Status:</strong> settlement</p>
    </div>
  )
}
