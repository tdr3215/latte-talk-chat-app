import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Latte Talk - Realtime Chat App",
  description: "Latte Talk Chat App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="coffee">
      <body>{children}</body>
    </html>
  );
}
