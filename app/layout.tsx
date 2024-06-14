import "./globals.css";
import { auth } from "@/auth";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { SessionProvider } from "next-auth/react";

const font = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className="h-full">
      <body className={cn("h-full antialiased", font.className)}>
        <SessionProvider session={session}>
          <Toaster position="top-center" richColors />

          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
