"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { accountSchema } from "@/schemas/settingsSchema";
import type User from "@/types/type";
const AccountForm = ({ user }: User) => {
  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      dateOfBirth: "",
    },
  });
  return (
    <Form {...form}>
      <form className="space-y-7">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder={"Your name"} {...field} />
              </FormControl>
              <p className="text-gray-500 text-xs">
                This is the name that will be displayed on your profile and in
                emails.
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input placeholder={"Pick a date"} {...field} />
              </FormControl>
              <p className="text-gray-500 text-xs">
                Your date of birth is used to calculate your age.
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Update account</Button>
      </form>
    </Form>
  );
};

export default AccountForm;
