import { getOAuthClient } from "@/lib/google";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const oauth2Client = getOAuthClient();

  if (!code) {
    return new NextResponse("No code provided", { status: 400 });
  }

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const tokenPath = path.join(process.cwd(), "token.json");
  fs.writeFileSync(tokenPath, JSON.stringify(tokens));

  return NextResponse.redirect(new URL("/", req.url));
}
