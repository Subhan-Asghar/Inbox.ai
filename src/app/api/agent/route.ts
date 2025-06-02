import { NextResponse,NextRequest } from "next/server";
import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';
export async function POST(req:NextRequest){
    const data=await req.json()
    const result = await generateText({
        model: groq('qwen-qwq-32b'),
        providerOptions: {
        groq: { reasoningFormat: 'parsed' },
        },
        prompt: data.prompt,
    });
    return NextResponse.json({
        result:result
    })

}