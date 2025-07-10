import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()
    const lastMessage = messages[messages.length - 1]

    const result = await generateText({
      model: google("gemini-1.5-flash"),
      messages: [
        {
          role: "system",
          content: `You are a professional perfume consultant and fragrance expert. You help customers discover their perfect fragrance based on their preferences, personality, and lifestyle. 

Key guidelines:
- Be knowledgeable about different fragrance families, notes, and brands
- Ask relevant questions to understand customer preferences
- Provide personalized recommendations
- Explain fragrance characteristics in an accessible way
- Be enthusiastic but professional
- Keep responses concise and helpful

Always respond in a friendly, expert manner as if you're a luxury perfume consultant.`,
        },
        ...messages,
      ],
      stream: true,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Failed to process chat request" }, { status: 500 })
  }
}
