import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import Header from "@/components/Header";
import AccountButton from "@/components/AccountButton";
import SettingsButton from "@/components/SettingsButton";

export const metadata: Metadata = {
  title: "flashcards-app",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header>
          <SettingsButton />
          <h1>Flashcards-App</h1>
          <AccountButton />
        </Header>
        {children}
      </body>
    </html>
  );
}
