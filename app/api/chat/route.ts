import { streamText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const result = streamText({
      model: google("gemini-1.5-flash"),
      messages,
      system: `You are a perfume AI expert and consultant. You help users discover and learn about fragrances, perfumes, and scents. 

Your expertise includes:
- Fragrance families and notes (top, middle, base)
- Perfume recommendations based on preferences
- Brand knowledge and comparisons
- Seasonal and occasion-appropriate scents
- Fragrance longevity and sillage
- Price ranges and value recommendations

Always be helpful, knowledgeable, and enthusiastic about fragrances. Provide detailed but accessible explanations. When recommending perfumes, consider the user's preferences, budget, and intended use.`,
      stream: true,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
