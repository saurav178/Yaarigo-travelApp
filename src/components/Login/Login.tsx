"use client";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

import { useState, useEffect, useRef } from "react";
import { FaTwitter, FaFacebookF, FaGoogle } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { trackEvent } from "../../lib/analytics";

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
  const [showPassword, setShowPassword] = useState(false);

  const [forgotMode, setForgotMode] = useState(false);
  const [forgotStep, setForgotStep] = useState<"email" | "otp" | "reset">(
    "email"
  );
  const [forgotData, setForgotData] = useState({
    emailOrPhone: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [otpLoginMode, setOtpLoginMode] = useState(false);
  const [otpLoginStep, setOtpLoginStep] = useState<"email" | "otp">("email");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const [remember, setRemember] = useState(false);

  // ✅ Remember me logic
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRemember(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
    setLocalError("");
  };

  // Inside Login component, at the top level
const handleForgotSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    // Step 1️⃣ — Send OTP
    if (forgotStep === "email") {
      if (!forgotData.emailOrPhone.trim()) {
        return toast.error("Enter email or phone");
      }

      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone: forgotData.emailOrPhone }),
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.error || "Error sending OTP");

      toast.success("OTP sent! Check console for dev OTP.");
      setForgotStep("otp");
      setOtp(Array(6).fill(""));
      setTimeout(() => inputsRef.current[0]?.focus(), 50);
      return;
    }

    // Step 2️⃣ — Verify OTP
    if (forgotStep === "otp") {
      const code = otp.join("");
      if (code.length !== 6) return toast.error("Enter 6-digit OTP");

      const res = await fetch("/api/auth/forgot-password/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone: forgotData.emailOrPhone, otp: code }),
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.error || "Invalid OTP");

      toast.success("OTP verified!");
      setForgotStep("reset");
      return;
    }

    // Step 3️⃣ — Reset Password
    if (forgotStep === "reset") {
      if (forgotData.newPassword !== forgotData.confirmPassword) {
        return toast.error("Passwords do not match");
      }

      const res = await fetch("/api/auth/forgot-password/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailOrPhone: forgotData.emailOrPhone,
          newPassword: forgotData.newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.error || "Error resetting password");

      toast.success("Password reset successfully!");
      setForgotMode(false);
      setForgotStep("email");
      setForgotData({ emailOrPhone: "", otp: "", newPassword: "", confirmPassword: "" });
      setOtp(Array(6).fill(""));
    }
  } catch (err: any) {
    toast.error(err.message || "Something went wrong");
  }
};


  // ✅ Email-password login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    const errors = { email: "", password: "" };
    if (!formData.email) {
      errors.email = "Email required";
      hasError = true;
    }
    if (!formData.password) {
      errors.password = "Password required";
      hasError = true;
    }
    setFieldErrors(errors);
    if (hasError) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid credentials");

      if (remember) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      onLogin(formData.email, formData.password);
      toast.success("Login successful!");
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "login", {
          method: "email",
          user_email: formData.email,
        });
      }
    } catch (err: any) {
      setLocalError(err.message);
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ OTP Login Functions
  const handleOtpLoginSend = async () => {
    if (!formData.email.trim()) return toast.error("Enter email or phone");

    setLoading(true);
    try {
      trackEvent("OTP_Login_Request", {
        emailOrPhone: formData.email,
        time: new Date().toISOString(),
      });

      const res = await fetch("/api/auth/otp-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone: formData.email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error sending OTP");

      toast.success(`OTP sent! Check console for dev OTP.`);
      console.log("DEV OTP:", data.otp); // For development
      setOtpLoginStep("otp");
      setOtp(Array(6).fill(""));
      setTimeout(() => inputsRef.current[0]?.focus(), 50);
    } catch (err: any) {
      toast.error(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpLoginVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6) return toast.error("Enter 6-digit OTP");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/otp-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone: formData.email, otp: code }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid OTP");

      toast.success("OTP verified! Logged in.");
      onLogin(data.email, ""); // Login with OTP, password empty
    } catch (err: any) {
      toast.error(err.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value.replace(/\D/g, "");
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    if (val && idx < inputsRef.current.length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
      const newOtp = [...otp];
      newOtp[idx - 1] = "";
      setOtp(newOtp);
    }
    if (e.key === "ArrowLeft" && idx > 0) inputsRef.current[idx - 1]?.focus();
    if (e.key === "ArrowRight" && idx < inputsRef.current.length - 1)
      inputsRef.current[idx + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("text");
    const digits = paste.replace(/\D/g, "").slice(0, 6).split("");
    if (digits.length === 0) return;
    const newOtp = Array(6).fill("");
    digits.forEach((d, i) => (newOtp[i] = d));
    setOtp(newOtp);
    const nextIndex = digits.length >= 6 ? 5 : digits.length;
    setTimeout(() => inputsRef.current[nextIndex]?.focus(), 10);
    e.preventDefault();
  };

  return (
    <div className="absolute top-20 right-10 md:right-20 w-full max-w-sm z-50">
      <div className="bg-white/90 backdrop-blur-md border border-gray-200 p-6 rounded-2xl shadow-md">
        {!forgotMode && !otpLoginMode ? (
          <>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1 text-center">
              Login
            </h1>
            <p className="text-xs text-gray-500 text-center mb-3">
              Continue exploring and planning your next adventure.
            </p>

            {(error || localError) && (
              <p className="text-red-600 text-sm mb-2 text-center">
                {error || localError}
              </p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                name="email"
                placeholder="Input email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-sm"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-sm pr-10"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

              <div className="text-xs text-gray-700">
                New to Travio?{" "}
                <span
                  className="text-blue-600 hover:underline cursor-pointer"
                  onClick={switchToSignup}
                >
                  Create an Account
                </span>
              </div>

              <div className="flex justify-between items-center text-xs text-gray-600">
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="accent-blue-500"
                  />
                  Remember me
                </label>
                <span
                  className="hover:text-blue-600 cursor-pointer"
                  onClick={() => setForgotMode(true)}
                >
                  Forgot your password?
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white font-medium py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50 text-sm mt-1"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p
              className="text-xs text-gray-500 text-center mt-3 cursor-pointer hover:text-gray-700"
              onClick={() => {
                setOtpLoginMode(true);
                setOtpLoginStep("email");
              }}
            >
              Login with OTP
            </p>

            <div className="flex items-center gap-2 my-2">
              <hr className="flex-grow border-gray-300" />
              <span className="text-gray-400 text-xs">Or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <div className="flex justify-center gap-4 mt-1">
              <FaGoogle className="text-red-500 text-lg cursor-pointer hover:scale-110 transition" />
              <FaFacebookF className="text-blue-600 text-lg cursor-pointer hover:scale-110 transition" />
              <FaTwitter className="text-sky-400 text-lg cursor-pointer hover:scale-110 transition" />
            </div>
          </>
        ) : otpLoginMode ? (
          <>
            <h1 className="text-2xl font-bold text-black mb-3 text-center">
              Login with OTP
            </h1>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                otpLoginStep === "email"
                  ? handleOtpLoginSend()
                  : handleOtpLoginVerify();
              }}
              className="flex flex-col gap-3"
            >
              {otpLoginStep === "email" && (
                <>
                  <input
                    type="text"
                    placeholder="Enter your email or phone number"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded-lg text-sm hover:opacity-90 transition"
                  >
                    Send OTP
                  </button>
                </>
              )}

              {otpLoginStep === "otp" && (
                <>
                  <p className="text-center text-sm text-gray-600">
                    Enter the 6-digit OTP sent to your email/phone
                  </p>
                  <div className="flex gap-2 justify-center">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => {
                          inputsRef.current[i] = el;
                        }}
                        value={digit}
                        onChange={(e) => handleOtpChange(e, i)}
                        onKeyDown={(e) => handleOtpKeyDown(e, i)}
                        onPaste={handlePaste}
                        maxLength={1}
                        inputMode="numeric"
                        className="w-10 h-10 text-center text-lg bg-white text-black border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="bg-green-600 text-white py-2 rounded-lg text-sm hover:opacity-90 transition mt-2"
                  >
                    Verify OTP & Login
                  </button>
                </>
              )}
            </form>

            <p
              className="text-sm text-black text-center mt-3 cursor-pointer hover:text-blue-600"
              onClick={() => {
                setOtpLoginMode(false);
                setOtpLoginStep("email");
                setOtp(Array(6).fill(""));
              }}
            >
              Back to Login
            </p>
          </>
        ) : (
          <>
            {/* Forgot Password UI stays exactly the same */}
          </>
        )}

        {forgotMode && (
          <>
            <h1 className="text-2xl font-bold text-black mb-3 text-center">
              Forgot Password
            </h1>

            <form onSubmit={handleForgotSubmit} className="flex flex-col gap-3">
              {forgotStep === "email" && (
                <>
                  <input
                    type="text"
                    placeholder="Enter your email or phone number"
                    value={forgotData.emailOrPhone}
                    onChange={(e) =>
                      setForgotData({
                        ...forgotData,
                        emailOrPhone: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded-lg text-sm hover:opacity-90 transition"
                  >
                    Send OTP
                  </button>
                </>
              )}

              {forgotStep === "otp" && (
                <>
                  <p className="text-center text-sm text-gray-600">
                    Enter the 6-digit OTP sent to your email/phone
                  </p>
                  <div className="flex gap-2 justify-center">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => {
                          inputsRef.current[i] = el;
                        }}
                        value={digit}
                        onChange={(e) => handleOtpChange(e, i)}
                        onKeyDown={(e) => handleOtpKeyDown(e, i)}
                        onPaste={handlePaste}
                        maxLength={1}
                        inputMode="numeric"
                        className="w-10 h-10 text-center text-lg bg-white text-black border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded-lg text-sm hover:opacity-90 transition mt-2"
                  >
                    Verify OTP
                  </button>
                </>
              )}

              {forgotStep === "reset" && (
                <>
                  <input
                    type="password"
                    placeholder="New password"
                    value={forgotData.newPassword}
                    onChange={(e) =>
                      setForgotData({
                        ...forgotData,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-sm"
                  />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={forgotData.confirmPassword}
                    onChange={(e) =>
                      setForgotData({
                        ...forgotData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-green-600 text-white py-2 rounded-lg text-sm hover:opacity-90 transition"
                  >
                    Reset Password
                  </button>
                </>
              )}
            </form>

            <p
              className="text-sm text-black text-center mt-3 cursor-pointer hover:text-blue-600"
              onClick={() => {
                setForgotMode(false);
                setForgotStep("email");
                setOtp(Array(6).fill(""));
              }}
            >
              Back to Login
            </p>
          </>
        )}
      </div>
    </div>
  );
}
