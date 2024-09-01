import { z } from "zod";
export const profileSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  bio: z.string(),
  urls: z.string(),
});
export const accountSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
});
