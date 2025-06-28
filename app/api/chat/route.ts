import type { NextRequest } from "next/server"
import { generateText, StreamingTextResponse } from "ai"
import { openai } from "@ai-sdk/openai"

/**
 * POST /api/chat
 *
 * Body: { messages: { role: "user" | "assistant"; content: string }[] }
 *
 * The `@ai-sdk/react` `useChat` hook automatically hits this endpoint
 * and expects an SSE/text-stream (not plain JSON).  We create that stream
 * with the AI SDK helpers.
 */
export async function POST(req: NextRequest) {
  try {
    // Parse the incoming conversation so far
    const { messages } = await req.json()

    // Pass the history to the model (important for context!)
    const { stream } = await generateText({
      model: openai("gpt-4o"), // change model if desired
      messages,
      temperature: 0.7,
      maxTokens: 1024,
    })

    // Pipe the stream straight back to the client
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error("❌ API /api/chat error:", error)

    // Respond with a non-stream error so the hook can surface details
    return new Response(
      JSON.stringify({
        error: (error as Error).message ?? "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    )
  }
}
