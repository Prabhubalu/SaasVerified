"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { AOSInitializer } from "@/components/ui/AOSInitializer";
import { MembershipModalProvider } from "@/contexts/MembershipModalContext";
import { VendorModalProvider } from "@/contexts/VendorModalContext";
import { SaaSRecommendationsModalProvider } from "@/contexts/SaaSRecommendationsModalContext";

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
          <VendorModalProvider>
            <SaaSRecommendationsModalProvider>
              <AOSInitializer />
              {children}
            </SaaSRecommendationsModalProvider>
          </VendorModalProvider>
        </MembershipModalProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

