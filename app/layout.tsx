import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/components/i18n-provider";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 👇 This script will put your Cohere API key on window */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.COHERE_API_KEY = "hvr5vn9zkFRCJdIVj1QNvSBobFDWQfR5tqK53IYH";
            `,
          }}
        />
        {/* 👇 Google public key exposed to window (hardcoded) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.GOOGLE_PUBLIC_KEY = "G-P3CSHDPC";
            `,
          }}
        />
        {/* Google Analytics (gtag.js) with hardcoded Measurement ID */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-P3CSHDPC`}
          strategy="afterInteractive"
        />
        <Script id="ga-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-P3CSHDPC', { send_page_view: true });
          `}
        </Script>
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <I18nProvider>
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
