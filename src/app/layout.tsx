import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  MagnifyingGlassIcon,
  PlusCircledIcon,
  GridIcon,
} from "@radix-ui/react-icons";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MySaves",
  description: "Explore and save videos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "mode-dark")}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="z-20 w-full items-center justify-between font-mono text-sm lg:fixed p-8">
            <div className="fixed bottom-0 lg:top-0 lg:items-start gap-4 left-0 flex h-48 lg:h-28 w-full items-end justify-center bg-gradient-to-t lg:bg-gradient-to-b from-white via-white dark:from-black dark:via-black pointer-events-none	">
              <Link
                href="/"
                className="flex place-items-center flex-col gap-1 mb-1 lg:mt-4 w-16 pointer-events-auto	"
              >
                <MagnifyingGlassIcon />
                <text>Explore</text>
              </Link>
              <Link
                href="/create"
                className="flex place-items-center flex-col gap-1 mb-1 lg:mt-4 w-16 pointer-events-auto	"
              >
                <PlusCircledIcon />
                <text>Create</text>
              </Link>
              <Link
                href="/saved"
                className="flex place-items-center flex-col gap-1 mb-1 lg:mt-4 w-16 pointer-events-auto	"
              >
                <GridIcon />
                <text>Saved</text>
              </Link>
            </div>
          </div>
          {children}
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
