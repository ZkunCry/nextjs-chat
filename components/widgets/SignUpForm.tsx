"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signup } from "@/services/auth/signup";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

import { useRouter } from "next/navigation";
import { useAuth } from "@/store/auth";
const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().min(2, {
      message: "Email must be at leat 2 characters",
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

export default function SignUpForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeat_password: "",
    },
  });
  const auth = useAuth((state) => state.accessToken);
  const { toast } = useToast();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { repeat_password, ...result } = values;
    try {
      const data = await signup(result);
      toast({ description: "You have successfully registered an account." });
      router.push("/");
    } catch (error) {
      if (error instanceof Error)
        toast({ title: "Something went wrong.", description: error.message });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4  ">
        <h1 className="text-center font-bold text-lg">SignUp</h1>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter a name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter a email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter a password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="repeat_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repeat password</FormLabel>
              <FormControl>
                <Input placeholder="Enter a password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Link className=" block text-center text-sm" href={"/signin"}>
          Already registered? Login to your account
        </Link>
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
