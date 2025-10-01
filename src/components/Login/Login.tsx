"use client";
import { useState } from "react";
import { FaTwitter, FaFacebookF, FaGoogle } from "react-icons/fa";

type Props = {
  onLogin: (email: string, password: string) => void;
  switchToSignup: () => void;
  error: string;
};

export default function Login({ onLogin, switchToSignup, error }: Props) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState("");
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
    setLocalError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotMode) return;

    let hasError = false;
    const errors = { email: "", password: "" };

    if (!formData.email) { errors.email = "Email required"; hasError = true; }
    if (!formData.password) { errors.password = "Password required"; hasError = true; }

    setFieldErrors(errors);

    if (!hasError) {
      setLoading(true);
      setTimeout(() => {
        if (formData.email === "test@travio.com" && formData.password === "123456") {
          onLogin(formData.email, formData.password);
        } else {
          setLocalError("Invalid email or password");
        }
        setLoading(false);
      }, 500);
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      setForgotMessage("Email is required");
      return;
    }
    setForgotMessage("Sending reset link...");
    setTimeout(() => {
      setForgotMessage(`A password reset link has been sent to ${forgotEmail} (dummy)`);
    }, 1000);
  };

  return (
    <div className="absolute top-20 right-10 md:right-20 w-full max-w-sm z-50">
      <div className="bg-white/80 backdrop-blur-md border border-white/50 p-6 rounded-2xl shadow-lg">
        {!forgotMode ? (
          <>
            <h1 className="text-2xl font-bold text-black mb-3 text-center">Login</h1>
            <p className="text-black/70 mb-4 text-sm text-center">Enter your credentials to continue</p>
            {(error || localError) && <p className="text-red-600 text-sm mb-3 text-center">{error || localError}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

              <div className="relative">
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
                <span
                  className="absolute right-3 top-2 text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                  onClick={() => setForgotMode(true)}
                >
                  Forgot?
                </span>
              </div>
              {fieldErrors.password && <p className="text-red-500 text-sm">{fieldErrors.password}</p>}

              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-sm text-black text-center mt-4 cursor-pointer hover:text-blue-600" onClick={switchToSignup}>
              Don't have an account? Sign up
            </p>

            <p className="text-center text-sm text-black/60 mt-4 mb-2">Or login with</p>
            <div className="flex justify-center gap-4">
              <FaTwitter className="text-blue-500 hover:text-blue-700 cursor-pointer" />
              <FaFacebookF className="text-blue-500 hover:text-blue-700 cursor-pointer" />
              <FaGoogle className="text-red-500 hover:text-red-700 cursor-pointer" />
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-black mb-3 text-center">Forgot Password</h1>
            <p className="text-black/70 mb-4 text-sm text-center">Enter your email to receive a reset link</p>
            {forgotMessage && <p className="text-green-600 text-sm mb-3 text-center">{forgotMessage}</p>}

            <form onSubmit={handleForgotSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="you@example.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white text-black border border-gray-300 focus:ring-2 focus:outline-none focus:ring-blue-400"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition"
              >
                Send Reset Link
              </button>
            </form>

            <p className="text-sm text-black text-center mt-4 cursor-pointer hover:text-blue-600" onClick={() => setForgotMode(false)}>
              Back to Login
            </p>
          </>
        )}
      </div>
    </div>
  );
}
