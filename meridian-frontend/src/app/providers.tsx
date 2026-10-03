"use client";

import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAuthStore } from "@/stores/auth-store";
import { apiClient } from "@/lib/api";

export function Providers({ children }: { children: React.ReactNode }) {
  const {setAuth, setIntializing} = useAuthStore();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  useEffect(() => {
    async function restoreSession() {
      try {
         const res = await apiClient.post("/auth/refresh");
         console.log(res);
         console.log("prov", res.data.data.user);
         setAuth(res.data.data.accessToken, res.data.data.user);
      } catch {

      } finally {
        setIntializing(false);
      }
    }
    restoreSession();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-right" richColors />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
