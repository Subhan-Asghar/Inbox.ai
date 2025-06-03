import { NextResponse,NextRequest } from "next/server";
import { createGroq } from '@ai-sdk/groq';
import { generateText } from 'ai';

const groq = createGroq({
    apiKey:process.env.GROQ_API_KEY
  });

const model = groq('gemma2-9b-it');
  
export async function POST(req:NextRequest){
    const {prompt} =await req.json()

    const result= await generateText({
        model:model,
        tools:{

        },
        prompt: prompt
    })

    return NextResponse.json({
        response:result.text,
    })

}