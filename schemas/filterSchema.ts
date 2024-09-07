import { z } from "zod";
export const filterSchema = z.object({
  items: z.array(z.string()),
  date: z.object({
    from: z.date().nullable(),
    to: z.date().nullable(),
  }),
  useDate: z.boolean(),
});
