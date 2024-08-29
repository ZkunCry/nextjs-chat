import SignUpForm from "@/components/widgets/SignUpForm";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "SignUp",
};
export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="border max-w-[400px] w-full rounded-lg px-3 py-6 ">
        <SignUpForm />
      </div>
    </div>
  );
}
