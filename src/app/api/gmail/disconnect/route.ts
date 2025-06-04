import { disconnect } from "@/lib/google";
import { NextResponse } from "next/server";

export async function GET(){
    const connection=disconnect()
    connection.revokeCredentials();
    return NextResponse.json({
        message:"User disconnect"
    })
}