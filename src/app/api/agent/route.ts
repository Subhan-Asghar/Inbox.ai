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
    prompt: prompt,
    tools: {
      heelo_subhan,
      latest_mail,   
    },
  });

    const toolResult = agent_result.toolResults[0].result;
      const refine_agent=await generateText({
        model:model,
        prompt: `Convert the following JSON into a human-readable message:\n\n${JSON.stringify(toolResult, null, 2)}`,          })
      return NextResponse.json({
        response: refine_agent.text
      });
     


    }
  
