import { google } from "googleapis";
import { getOAuthClient } from "@/lib/google";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const oauth2Client = getOAuthClient();

  if (!code) {
    return new NextResponse("No code provided", { status: 400 });
  }

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const gmail = google.gmail({ version: "v1", auth: oauth2Client });
  return NextResponse.json({
    gmail:gmail
  });
}