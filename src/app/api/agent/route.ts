import { NextResponse, NextRequest } from "next/server";
import { createGroq } from '@ai-sdk/groq';
import { generateText } from 'ai';
import { heelo_subhan, latest_mail } from "@/tools/tools";
import { refreshToken } from "@/lib/refreshToken";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

const model = groq('gemma2-9b-it');

export async function POST(req: NextRequest) {
  await refreshToken();
  const { prompt } = await req.json();

  const agent_result = await generateText({
    model: model,
    tools: {
      latest_mail,
      heelo_subhan
    },
    prompt: prompt,
  });

  const toolResult = agent_result.toolResults?.[0]?.result;
  
  return NextResponse.json({
    response: toolResult || "Sorry, I couldn't find a matching tool for your request. Try rephrasing your question.",
  });
}
