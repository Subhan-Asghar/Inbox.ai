import { getGmailClient } from "../lib/gmail";

export const latestMail = async () => {
  const gmail = getGmailClient();
  const listRes = await gmail.users.messages.list({
    userId: "me",
    maxResults: 1, 
  });

  const messages = listRes.data.messages;
  if (!messages || messages.length === 0) {
    console.log("No messages found.");
    return null;
  }

  const latestMessageId = messages[0].id;
  const msgRes = await gmail.users.messages.get({
    userId: "me",
    id: latestMessageId!,
    format: "full",
  });

  const payload = msgRes.data.payload;
  const headers = payload?.headers;

  const subject = headers?.find(h => h.name === "Subject")?.value || "(No Subject)";
  const from = headers?.find(h => h.name === "From")?.value || "(Unknown Sender)";
  const snippet = msgRes.data.snippet || "";

  return {
    subject,
    from,
    snippet,
    id: latestMessageId,
  };
};
