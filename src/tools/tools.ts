import { tool } from "ai";
import { z } from "zod";
import { latestMail } from "./utils";

export const latest_mail = tool({
  description: "Fetches the most recent email from the user's Gmail account.",
  parameters: z.object({}),
  execute: async ({}) => {
    const result = await latestMail();
    return result;
  },
});

export const heelo_subhan = tool({
  description: "A greeting tool that returns a friendly message to Subhan.",
  parameters: z.object({}),
  execute: async ({}) => {
    return "Hello Subhan! Hope you're having a productive day.";
  },
});
