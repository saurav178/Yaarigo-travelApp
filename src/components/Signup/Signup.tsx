"use client";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

import { useState } from "react";
import { FaTwitter, FaFacebookF, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify"; // ✅ Toast import
import "react-toastify/dist/ReactToastify.css";

type Props = {
  onSignup: (fullName: string, email: string, password: string) => void;
  switchToLogin: () => void;
  error: string;
};

export default function Signup({ onSignup, switchToLogin, error }: Props) {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({ fullName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
    setLocalError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    const errors = { fullName: "", email: "", password: "" };

    if (!formData.fullName) { errors.fullName = "Full name required"; hasError = true; }
    if (!formData.email) { errors.email = "Email required"; hasError = true; }
    if (!formData.password) { errors.password = "Password required"; hasError = true; }

    setFieldErrors(errors);
    if (hasError) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Signup failed");

      // ✅ On success
      onSignup(formData.fullName, formData.email, formData.password);
      toast.success("Signup successful! Redirecting...");

      // ✅ Analytics tracking (example)
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "signup", {
          method: "email",
          user_email: formData.email,
        });
      }

    } catch (err: any) {
      setLocalError(err.message);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-20 right-10 md:right-20 w-full max-w-sm z-50">
      <div className="bg-white/80 backdrop-blur-md border border-white/50 p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-black mb-3 text-center">Sign up</h1>
        <p className="text-black/70 mb-4 text-sm text-center">
          Join us today! It only takes a minute
        </p>

        {(error || localError) && (
          <p className="text-red-600 text-sm mb-3 text-center">{error || localError}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg bg-white text-black border focus:ring-2 focus:outline-none ${
              fieldErrors.fullName ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {fieldErrors.fullName && <p className="text-red-500 text-sm">{fieldErrors.fullName}</p>}

          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg bg-white text-black border focus:ring-2 focus:outline-none ${
              fieldErrors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {fieldErrors.email && <p className="text-red-500 text-sm">{fieldErrors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg bg-white text-black border focus:ring-2 focus:outline-none ${
              fieldErrors.password ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {fieldErrors.password && <p className="text-red-500 text-sm">{fieldErrors.password}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <p
          className="text-sm text-black text-center mt-4 cursor-pointer hover:text-blue-600"
          onClick={switchToLogin}
        >
          Already have an account? Log in
        </p>

        <p className="text-center text-sm text-black/60 mt-4 mb-2">Or sign up with</p>
        <div className="flex justify-center gap-4">
          <FaTwitter className="text-blue-500 hover:text-blue-700 cursor-pointer" />
          <FaFacebookF className="text-blue-500 hover:text-blue-700 cursor-pointer" />
          <FaGoogle className="text-red-500 hover:text-red-700 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
