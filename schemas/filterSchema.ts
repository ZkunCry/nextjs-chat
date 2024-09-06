import { z } from "zod";
export const filterSchema = z.object({
  items: z.array(z.string()),
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
});
