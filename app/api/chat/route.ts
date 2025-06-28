import { StreamingTextResponse, generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// POST /api/chat – compatible with @ai-sdk/react `useChat`
export async function POST(req: Request) {
  try {
    const { messages = [] } = await req.json()

    // Turn on streaming mode (✅ crucial for useChat)
    const { stream } = await generateText({
      model: openai("gpt-4o"),
      messages,
      stream: true, // <-- THIS FIXES THE 500 ERROR
      temperature: 0.7,
      maxTokens: 1024,
      system: "You are an expert perfume consultant. Provide detailed, friendly fragrance advice tailored to the user.",
    })

    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error("❌ /api/chat failed:", error)
    return new Response(JSON.stringify({ error: (error as Error).message ?? "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
