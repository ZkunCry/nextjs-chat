import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cookies } from "next/headers";
import { CookiesProvider } from "next-client-cookies/server";
import { Suspense } from "react";
import Loading from "./loading";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Next Chat",
  description: "Created by eugene",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = cookies().getAll();
  console.log(cookie);
  return (
    <html lang="en">
      <body
        className={cn(
          "dark:bg-background bg-background dark:text-white text-black antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CookiesProvider>
            <Suspense fallback={<Loading />}>
              <div className="flex flex-col min-h-dvh h-1 w-full">
                {children}
              </div>
              <Toaster />
            </Suspense>
          </CookiesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
