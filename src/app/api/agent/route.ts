import { NextResponse, NextRequest } from "next/server";
import { createGroq } from '@ai-sdk/groq';
import { generateText } from 'ai';
import { latest_mail,Sent_mail,heelo_subhan,get_mail_date } from "@/tools/tools";
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
    prompt: `You're an assistant that helps with emails and also responds conversationally. Only use tools if the user clearly asks for email-related info. Otherwise, just reply directly.\n\nUser: ${prompt}`,
    tools: {
      heelo_subhan,
      latest_mail,
      Sent_mail,
      get_mail_date
    },
    toolChoice: "auto",
  });

    const toolResult = agent_result.toolResults[0].result;
      const refine_agent=await generateText({
        model:model,
        prompt: `Convert the following JSON into a human-readable message:\n\n${JSON.stringify(toolResult, null, 2)}`,          })
      return NextResponse.json({
        response: refine_agent.text
      });
     


    }
  
