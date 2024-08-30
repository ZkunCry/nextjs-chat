"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { axiosInstance } from "@/services/axios";
import { UserAuth } from "@/types/type";
import { signInSchema } from "@/schemas/authschema";
import { useUser } from "@/store/user";
import { useAuth } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { AxiosError } from "axios";
export default function SignInForm() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { onQuery, isLoading, isSuccess } = useCustomQuery<
    UserAuth,
    z.infer<typeof signInSchema>
  >({
    query: async (credentials) => {
      try {
        const result = await axiosInstance.post<UserAuth>(
          "/api/user/signin",
          credentials
        );
        return result.data;
      } catch (error) {
        throw error;
      }
    },
  });
  const setUser = useStoreWithEqualityFn(useUser, (state) => state.setUser);
  const setAccessToken = useStoreWithEqualityFn(
    useAuth,
    (state) => state.setAccessToken
  );
  const { toast } = useToast();
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    try {
      const response = await onQuery(values);
      if (response !== null) {
        const { accessToken, ...resUser } = response;
        setUser(resUser);
        setAccessToken(accessToken);
        toast({ description: "You have successfully login an account." });
        router.push("/");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          description: `Oops! Something went wrong: ${error.response?.data?.error}`,
        });
      }
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4  ">
        <h1 className="text-center font-bold text-lg">SignIn</h1>

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

        <Link className=" block text-center text-sm" href={"/signup"}>
          Already not registered? Register your account
        </Link>
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
