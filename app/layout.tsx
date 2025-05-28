import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'

import { Toaster } from "sonner";
import { QueryProviders } from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheet-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: 'Personal Finance Tracker',
  description: 'Track your income and expenses.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <QueryProviders>
            <SheetProvider />
            <Toaster />
            {children}
          </QueryProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
