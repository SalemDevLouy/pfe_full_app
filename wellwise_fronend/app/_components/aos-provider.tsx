"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";

export default function AosProvider() {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 64,
    });
  }, []);

  useEffect(() => {
    AOS.refreshHard();
  }, [pathname]);

  return null;
}