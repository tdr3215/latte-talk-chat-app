import type { Metadata } from "next";
import "./globals.css";
import ToasterContext from "./(site)/context/ToasterContext";
import AuthContext from "./(site)/context/AuthContext";

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
      <body>
        <AuthContext>
          <ToasterContext />

          {children}
        </AuthContext>
      </body>
    </html>
  );
}
