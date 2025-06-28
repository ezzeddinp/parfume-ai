import { google } from "@ai-sdk/google"
import { streamText } from "ai"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const result = streamText({
      model: google("gemini-1.5-flash"),
      messages,
      system: `You are an expert perfume consultant and fragrance specialist. You have deep knowledge about:
- Perfume composition (top, middle, base notes)
- Fragrance families (floral, woody, oriental, fresh, etc.)
- Brand recommendations and comparisons
- Seasonal and occasion-appropriate scents
- Perfume longevity and projection tips
- Ingredient knowledge and olfactory profiles

Respond in a friendly, knowledgeable manner. Keep responses concise but informative. You can answer in Indonesian or English based on the user's language preference.`,
      temperature: 0.7,
      maxTokens: 500,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("❌ API Error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
