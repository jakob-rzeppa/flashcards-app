import { GeistSans } from "geist/font/sans";
import "./globals.css";
import getUserId from "@/actions/getUserId";

export const metadata = {
  title: "flashcards-app",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} data-theme="sunset">
      <body className="bg-background text-foreground">{children}</body>
    </html>
  );
}
