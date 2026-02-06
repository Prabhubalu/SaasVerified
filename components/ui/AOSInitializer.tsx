"use client";

import { useEffect, useState } from "react";
import AOS from "aos";

export function AOSInitializer() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Initialize AOS after hydration is complete
    const initAOS = () => {
      AOS.init({
        duration: 800,
        once: true,
        disable: 'phone', // Only disable on phones, not tablets/desktop
      });
    };

    // Use requestAnimationFrame to ensure DOM is ready after hydration
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(initAOS);
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isClient]);

  return null;
}
