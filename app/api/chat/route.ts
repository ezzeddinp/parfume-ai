import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    console.log("🚀 API Chat endpoint called")

    const { messages } = await req.json()
    console.log("📝 Messages received:", messages)

    // Check if API key exists
    if (!process.env.OPENAI_API_KEY) {
      console.error("❌ OPENAI_API_KEY not found")
      return new Response(
        JSON.stringify({
          error: "OpenAI API key not configured",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    console.log("🔑 API Key found, calling OpenAI...")

    const result = streamText({
      model: openai("gpt-4o"),
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
      onFinish: (result) => {
        console.log("✅ AI Response completed:", result.text.slice(0, 100) + "...")
      },
    })

    console.log("📤 Sending response stream...")
    return result.toDataStreamResponse()
  } catch (error) {
    console.error("💥 API Error:", error)
    return new Response(
      JSON.stringify({
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
