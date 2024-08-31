import { z } from "zod";
export const profileSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  bio: z.string(),
  urls: z.string(),
});
