import { streamText } from "ai"
import { google } from "@ai-sdk/google"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    console.log("🚀 API Chat endpoint called")

    const { messages } = await req.json()
    console.log("📝 Messages received:", messages)

    // Check if Gemini API key exists
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error("❌ GOOGLE_GENERATIVE_AI_API_KEY not found")
      return new Response(
        JSON.stringify({
          error: "Gemini API key not configured",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    console.log("🔑 Gemini API Key found, calling Gemini...")

    const result = streamText({
      model: google("gemini-1.5-flash"),
      system: `You are an expert perfume consultant and fragrance specialist with extensive knowledge about:

- Fragrance families (floral, oriental, woody, fresh, etc.)
- Perfume notes (top, middle, base notes)
- Popular perfume brands and their signature scents
- Seasonal and occasion-appropriate fragrances
- Perfume longevity, sillage, and projection
- Fragrance layering techniques
- Skin chemistry and how it affects perfumes
- Niche vs designer fragrances
- Perfume history and trends

Your role is to:
- Provide personalized perfume recommendations based on user preferences
- Explain fragrance compositions and note breakdowns
- Suggest perfumes for different occasions, seasons, or moods
- Help users understand their scent preferences
- Educate about proper perfume application and storage
- Compare different fragrances and brands
- Discuss fragrance trends and new releases

Always be enthusiastic, knowledgeable, and helpful. Ask follow-up questions to better understand the user's preferences when making recommendations. Keep responses conversational and engaging while being informative.`,
      messages,
      temperature: 0.7,
      maxTokens: 1024,
    })

    console.log("📤 Sending Gemini response stream...")
    return result.toDataStreamResponse()
  } catch (error) {
    console.error("💥 Gemini API Error:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to process request with Gemini",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
