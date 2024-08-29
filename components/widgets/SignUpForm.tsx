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
import { axiosInstance } from "@/services/axios";
import { Input } from "@/components/ui/input";
import { signup } from "@/services/auth/signup";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/authschema";
import User, { type UserAuth } from "@/types/type";
import { LoaderCircle, LoaderIcon } from "lucide-react";
import { useUser } from "@/store/user";
import { useAuth } from "@/store/auth";
import { shallow } from "zustand/shallow";
export default function SignUpForm() {
  const router = useRouter();
  const { setUser } = useUser();
  const { setAccessToken, accessToken } = useAuth();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeat_password: "",
    },
  });
  const { onQuery, isLoading, isSuccess } = useCustomQuery<
    UserAuth,
    z.infer<typeof signUpSchema>
  >({
    query: async (credentials) => {
      const result = await axiosInstance.post<UserAuth>(
        "/api/user/signup",
        credentials,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return result.data;
    },
  });

  const { toast } = useToast();
  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    try {
      const data = await onQuery(values);
      if (data !== null) {
        const { accessToken, ...resUser } = data;
        setUser(resUser);
        setAccessToken(accessToken);
        toast({ description: "You have successfully registered an account." });
        router.push("/");
      }
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
        <Button disabled={isLoading} className="w-full" type="submit">
          {isLoading ? <LoaderCircle className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
