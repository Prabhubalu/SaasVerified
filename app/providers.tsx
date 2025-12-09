"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { AOSInitializer } from "@/components/AOSInitializer";
import { MembershipModalProvider } from "@/contexts/MembershipModalContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <MembershipModalProvider>
          <AOSInitializer />
          {children}
        </MembershipModalProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

