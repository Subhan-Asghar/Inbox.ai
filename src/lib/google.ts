import { google } from "googleapis";

export function getOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URI
  );
}

export function getAuthUrl() {
  const oauth2Client = getOAuthClient();
  const SCOPES = ['https://mail.google.com/'];

  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
}

