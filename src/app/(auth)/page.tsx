"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Login from "../../components/Login/Login";
import Signup from "../../components/Signup/Signup";
import { useAuth } from "../../components/layout/GlobalLayout";

export default function Page() {
  const [showSignup, setShowSignup] = useState(false);
  const [error, setError] = useState("");
  const { setIsLoggedIn } = useAuth();
  const router = useRouter();

  const handleLogin = (email: string, pw: string) => {
    setIsLoggedIn(true);
    console.log("Login", email, pw);
    router.push("/");
  };

  return showSignup ? (
    <Signup
      onSignup={(fn: string, email: string, pw: string) => console.log("Signup", fn, email, pw)}
      switchToLogin={() => setShowSignup(false)}
      error={error}
    />
  ) : (
    <Login
      onLogin={handleLogin}
      switchToSignup={() => setShowSignup(true)}
      error={error}
    />
  );
}
