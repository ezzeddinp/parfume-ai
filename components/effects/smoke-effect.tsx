"use client"

export default function SmokeEffect() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none">
      <div className="h-64 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className="h-24 bg-gradient-to-t from-black/90 via-black/40 to-transparent -mt-24" />
      <div className="h-16 bg-gradient-to-t from-black/70 via-black/30 to-transparent -mt-16" />
    </div>
  )
}
