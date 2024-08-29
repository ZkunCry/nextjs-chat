import { z } from "zod";
export const signInSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Email must be at leat 2 characters",
    })
    .email({
      message: "Email doesn't includes important symbols",
    }),
  password: z.string().min(8, {
    message: "Password must be at leat 8 characters",
  }),
});
export const signUpSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z
      .string()
      .min(2, {
        message: "Email must be at leat 2 characters",
      })
      .email({
        message: "Email doesn't includes important symbols",
      }),
    password: z.string().min(8, {
      message: "Password must be at leat 8 characters",
    }),
    repeat_password: z.string(),
  })
  .refine((data) => data.password === data.repeat_password, {
    message: "Password don't match",
    path: ["repeat_password"],
  });
