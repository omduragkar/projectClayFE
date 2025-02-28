import React, { Suspense } from "react";
import AuthBasedComponent from "@/components/auth/AuthComponent";
import { Loader2 } from "lucide-react";

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen min-w-screen flex items-center justify-center">
          <Loader2 />
        </div>
      }
    >
      <AuthBasedComponent />
    </Suspense>
  );
}
