import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'

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
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
