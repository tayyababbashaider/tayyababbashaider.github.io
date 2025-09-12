import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tayyab Portfolio",
  description: "Personal portfolio website of Tayyab Abbas Haider",
  generator: "Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* 👇 This script will put your Cohere API key on window */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.COHERE_API_KEY = "hvr5vn9zkFRCJdIVj1QNvSBobFDWQfR5tqK53IYH";
            `,
          }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
