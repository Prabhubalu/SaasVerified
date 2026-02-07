"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";

export function AOSInitializer() {
  const [isClient, setIsClient] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const pathname = usePathname();

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
        disable: false, // Don't disable - let AOS handle all devices
        startEvent: 'DOMContentLoaded',
      });
      document.body.classList.add('aos-initialized');
      setIsInitialized(true);
    };

    // Use requestAnimationFrame to ensure DOM is ready after hydration
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(initAOS);
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isClient]);

  // Refresh AOS when route changes
  useEffect(() => {
    if (!isClient || !isInitialized) return;
    
    // Reinitialize AOS on route change to handle new elements
    const timeoutId = setTimeout(() => {
      AOS.refreshHard();
    }, 50);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname, isClient, isInitialized]);

  return null;
}
