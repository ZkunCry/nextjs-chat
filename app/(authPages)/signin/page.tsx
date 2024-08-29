import React from "react";

import SignInForm from "@/components/widgets/SignInForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignIn",
};

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="border max-w-[400px] w-full rounded-lg px-3 py-6 ">
        <SignInForm />
      </div>
    </div>
  );
}
