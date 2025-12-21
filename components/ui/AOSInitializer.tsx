"use client";

import { useEffect } from "react";
import AOS from "aos";

export function AOSInitializer() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  return null;
}

