"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { FooterWrapper } from "@/components/FooterWrapper";

export function ConditionalNavbar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isAdminLoginPage = pathname === "/admin";
  const showNavbar = !isAdminLoginPage; // Show navbar everywhere except /admin login page

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
      {!isAdminRoute && <FooterWrapper />}
    </>
  );
}
