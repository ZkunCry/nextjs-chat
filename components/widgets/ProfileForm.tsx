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
import { profileSchema } from "@/schemas/settingsSchema";
import type User from "@/types/type";

const ProfileForm = ({ user }: User) => {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      email: "",
      bio: "",
      urls: "",
    },
  });
  console.log(user);
  return (
    <Form {...form}>
      <form className="space-y-7">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder={user.username} {...field} />
              </FormControl>
              <p className="text-gray-500 text-xs">
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder={user.email} {...field} />
              </FormControl>
              <p className="text-gray-500 text-xs">
                You can manage verified email addresses in your email settings.
              </p>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input placeholder="Tell about yourself" {...field} />
              </FormControl>
              <p className="text-gray-500 text-xs">
                You can @mention other users and organizations to link to them.
              </p>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="urls"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URLs</FormLabel>
              <p className="text-gray-500 text-xs">
                Add links to your website, blog, or social media profiles.
              </p>
              <FormControl>
                <Input placeholder="https://example.com/" {...field} />
              </FormControl>
              <Button size={"sm"} variant={"outline"}>
                Add URL
              </Button>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ProfileForm;
