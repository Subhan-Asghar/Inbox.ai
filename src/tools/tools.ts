import { tool } from "ai";
import { z } from "zod";
import { latestMail } from "./utils";

export const latest_mail = tool({
    parameters: z.object({}), 
    execute: async ({}) => {
      const result = await latestMail();
      return result;
    }
  });