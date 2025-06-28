import { google } from "@ai-sdk/google"
import { streamText } from "ai"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const result = await streamText({
      model: google("gemini-1.5-flash"),
      messages,
      system: `You are a professional perfume consultant and fragrance expert. You help users discover their perfect scent based on their preferences, occasions, and personality. 

Key expertise areas:
- Fragrance families (floral, oriental, woody, fresh, etc.)
- Top, middle, and base notes
- Seasonal and occasion-appropriate scents
- Brand recommendations across all price ranges
- Fragrance longevity and projection
- Layering techniques
- Skin chemistry considerations

Always provide helpful, personalized recommendations and explain your reasoning. Be enthusiastic about fragrances while remaining professional.`,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API Error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
