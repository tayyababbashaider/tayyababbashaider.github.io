import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/components/i18n-provider";
import GATracker from "@/components/ga-tracker";
import { GA_ID } from "@/lib/ga";
import { Suspense } from "react";

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
        {/* Google Analytics (GA4) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-gtag" strategy="afterInteractive">
          {`
            (function () {
              function getCookie(name) {
                const value = "; " + document.cookie;
                const parts = value.split("; " + name + "=");
                if (parts.length === 2) return parts.pop().split(";").shift();
              }
              function setCookie(name, value, days) {
                const d = new Date();
                d.setTime(d.getTime() + (days*24*60*60*1000));
                document.cookie = name + "=" + value + ";expires=" + d.toUTCString() + ";path=/;SameSite=Lax";
              }
              var id = getCookie('gaid') || '${GA_ID}';
              if (!getCookie('gaid')) setCookie('gaid', id, 3650);

              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              // Disable automatic page_view; tracked via route changes
              gtag('config', id, { send_page_view: false });
            })();
          `}
        </Script>
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <I18nProvider>
            {children}
            <Suspense fallback={null}>
              <GATracker />
            </Suspense>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}