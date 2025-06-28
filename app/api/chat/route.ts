import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export async function POST(req: Request) {
  try {
    console.log("🚀 API Chat endpoint called");

    const { messages } = await req.json();
    console.log("📝 Messages received:", messages);

    // ✅ Validate presence of Gemini API key
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      console.error("❌ GOOGLE_GENERATIVE_AI_API_KEY not found");
      return Response.json(
        {
          error:
            "Gemini API key not configured. Please add GOOGLE_GENERATIVE_AI_API_KEY to your environment variables.",
        },
        { status: 500 }
      );
    }

    console.log("🔑 Gemini API Key found, calling Gemini...");

    const result = await streamText({
      model: google("gemini-1.5-flash"),
      messages,
      system: `
You are an expert perfume consultant and fragrance specialist with deep knowledge about:

- Fragrance families (floral, oriental, woody, fresh, etc.)
- Perfume notes (top, middle, base)
- Popular perfume brands and their signature scents
- Seasonal and occasion-based fragrances
- Longevity, sillage, and projection
- Fragrance layering
- Skin chemistry
- Niche vs. designer perfumes
- Trends and history

Your job is to:
- Recommend perfumes based on user input
- Explain scent profiles clearly
- Ask engaging follow-up questions
- Keep responses casual, helpful, and user-focused
- Use Indonesian or English depending on the user

Important:
- DO NOT use markdown formatting like **bold**, __italic__, or backticks.
- Write in plain text only, without any special characters for styling.
- If you want to emphasize something, use natural language instead.
- Keep responses conversational, friendly, and natural.
`,
      temperature: 0.7,
      maxTokens: 1000,
    });

    console.log("📤 Streaming Gemini response...");
    return result.toDataStreamResponse();

  } catch (error) {
    console.error("💥 Gemini API Error:", error);
    return Response.json(
      {
        error: "Failed to process request with Gemini",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
