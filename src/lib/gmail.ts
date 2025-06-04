import fs from "fs";
import { google } from "googleapis";

export function getGmailClient() {
  const tokens = JSON.parse(fs.readFileSync("token.json", "utf8"));

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  oauth2Client.setCredentials(tokens);
  const gmail=google.gmail({ version: "v1", auth: oauth2Client })
  return gmail
}