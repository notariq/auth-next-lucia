import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const maisonNeue = localFont({
  src: [
    {
      path: "./fonts/Maison_Neue_Book.ttf",
      style: "book",
    },
    {
      path: "./fonts/Maison_Neue_Bold.ttf",
      style: "bold",
    },
    {
      path: "./fonts/Maison_Neue_Light.ttf",
      style: "light",
    },
    {
      path: "./fonts/Maison_Neue_Mono.ttf",
      style: "mono",
    },
  ],
  variable: "--maison-neue",
})

export const metadata: Metadata = {
  title: "Welcome",
  description: "redirecting...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-book tracking-wide antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
