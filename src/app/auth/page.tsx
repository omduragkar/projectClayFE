import React, { Suspense } from "react";
import AuthBasedComponent from "@/components/auth/AuthComponent";

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthBasedComponent/>
    </Suspense>
  );
}