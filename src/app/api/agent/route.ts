import { NextResponse,NextRequest } from "next/server";
import { createGroq } from '@ai-sdk/groq';
import { generateText } from 'ai';
import { latest_mail } from "@/tools/tools";
const groq = createGroq({
    apiKey:process.env.GROQ_API_KEY
  });

const model = groq('gemma2-9b-it');
  
export async function POST(req:NextRequest){
    const {prompt} =await req.json()

    const agent_result= await generateText({
        model:model,
        tools:{
            latest_mail
        },
        prompt: prompt
    })

    return NextResponse.json({
        response:agent_result.toolResults[0].result
    })

}