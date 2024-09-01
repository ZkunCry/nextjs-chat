import Header from "@/components/widgets/Header";
import ModeToggle from "@/components/widgets/ModeToggle";
import PageHeader from "@/components/widgets/PageHeader";
import Link from "next/link";
import { cookies, headers } from "next/headers";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header>
        <div className="flex container justify-between items-center py-4">
          <Link
            href={"/"}
            className="font-bold text-xl dark:text-white py-2 px-4 border rounded-lg"
          >
            NextJsPosts
          </Link>
          <ModeToggle />
        </div>
      </Header>
      {children}
    </>
  );
}
