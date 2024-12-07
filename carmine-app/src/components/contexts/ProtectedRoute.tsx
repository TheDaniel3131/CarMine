"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/contexts/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useAuth(); // Ensure `useAuth` provides `loading` state
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // Ensure the component only runs on the client
  useEffect(() => {
    setIsClient(true);

    if (!loading && !isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated, loading, router]);

  // Avoid rendering until hydration completes
  if (!isClient || loading) {
    return <div></div>; // Optionally replace with a spinner
  }

  return <>{children}</>;
}
