import { tool } from "ai";
import { z } from "zod";
import { latestMail, sent_mail } from "./utils";

// Get the latest mail
export const latest_mail = tool({
  description: "Fetches the most recent email from the user's Gmail account.",
  parameters: z.object({}),
  execute: async ({}) => {
    const result = await latestMail();
    return result;
  },
});

// Just to fix the issuse 
export const heelo_subhan = tool({
  description: "A greeting tool that returns a friendly message ",
  parameters: z.object({}),
  execute: async ({}) => {
    return "The tool associated with this message does not exist.";
  },
});

export const Sent_mail=tool({
  description:"Use this tool to sent mail ",
  parameters:z.object({
    to:z.array(z.string()),
    message:z.string(),
    subject:z.string()
  }),
  execute: async({to,subject,message})=>{
    const result=await sent_mail(to,subject,message)
    return `${result}`
  }
})