import LoginSection from "@/components/auth/login";
import AuthLayout from "@/components/layouts/auth-layout";
import React from "react";

function Login() {
  return (
    <AuthLayout>
      <LoginSection />
    </AuthLayout>
  );
}

export default Login;
