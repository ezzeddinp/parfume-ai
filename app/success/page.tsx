"use client"
import {useRouter} from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent text-center px-4">
      <h1 className="text-5xl font-extrabold text-green-500 mb-4">Payment Successful ✅</h1>
      <p className="text-lg text-white">
        Your transaction has been <strong className="text-green-400">completed</strong> successfully.
      </p>
      <p className="text-white mt-2 mb-6">
        Status: <strong className="text-green-400">Settlement</strong>
      </p>
        <button onClick={() => router.push('/')} className="text-md text-regular px-6 py-3 bg-green-700/5 border border-2 border-green-800 text-white hover:text-green-400 font-semibold rounded-lg shadow-md hover:bg-green-800 transition">
          Back to Home
        </button>
    </div>
  );
}
