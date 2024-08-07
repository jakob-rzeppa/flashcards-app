import { GeistSans } from "geist/font/sans";
import "./globals.css";

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
    <html lang="en" className={GeistSans.className} data-theme="light">
      <body className="overflow-x-hidden w-screen">{children}</body>
    </html>
  );
}
