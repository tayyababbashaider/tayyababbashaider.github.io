"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

function getCookie(name: string) {
  if (typeof document === "undefined") return "";
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop()!.split(";").shift() || "";
  return "";
}

export default function GATracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const gaid = getCookie("gaid");
    if (!gaid || typeof window === "undefined" || typeof window.gtag !== "function") return;

    const url = searchParams?.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname || "/";

    window.gtag("config", gaid, { page_path: url });
  }, [pathname, searchParams]);

  return null;
}
