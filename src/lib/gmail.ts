import fs from "fs";
import { google, gmail_v1 } from "googleapis";
import { getOAuthClient } from "./google";

let gmailClient: gmail_v1.Gmail | null = null;

export function getGmailClient(): gmail_v1.Gmail {
  if (!gmailClient) {
    const tokens = JSON.parse(fs.readFileSync("token.json", "utf8"));

    const oauth2Client = getOAuthClient();
    oauth2Client.setCredentials(tokens);
    gmailClient = google.gmail({ version: "v1", auth: oauth2Client });
  }

  return gmailClient;
}
