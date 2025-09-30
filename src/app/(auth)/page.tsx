"use client";
import { useState } from "react";
import Login from "../../components/Login";
import Signup from "../../components/Signup";

export default function Page() {
  const [showSignup, setShowSignup] = useState(false);
  const [error, setError] = useState("");

  return showSignup ? (
    <Signup
      onSignup={(fn, email, pw) => console.log("Signup", fn, email, pw)}
      switchToLogin={() => setShowSignup(false)}
      error={error}
    />
  ) : (
    <Login
      onLogin={(email, pw) => console.log("Login", email, pw)}
      switchToSignup={() => setShowSignup(true)}
      error={error}
    />
  );
}