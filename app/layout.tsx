import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import Header from "@/components/Header";
import AccountButton from "@/components/AccountButton";
import SettingsButton from "@/components/SettingsButton";
import HeaderTitle from "@/components/HeaderTitle";

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
          <HeaderTitle title="Flashcards App"></HeaderTitle>
          <AccountButton />
        </Header>
        {children}
      </body>
    </html>
  );
}
