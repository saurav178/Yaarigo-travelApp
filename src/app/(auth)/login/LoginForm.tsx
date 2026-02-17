"use client";

import { useState } from "react";
import { useModal } from "../../../context/ModalContext";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import Image from "next/image";

export default function LoginForm() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { login } = useAuth();
  const { closeModal } = useModal(); // still called after successful login
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);
    try {
      await login({ email: emailOrPhone, password });
      closeModal();
      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error ? err.message : "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,700;1,900&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .login-root {
          font-family: 'DM Sans', sans-serif;
          min-height: calc(100vh - 80px); /* subtract header height */
          display: flex;
          background: #0e1c22;
        }

        /* ─── Left Panel ─── */
        .login-left {
          width: 42%;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 3.5rem;
          background: linear-gradient(160deg, #1a3340 0%, #0e1c22 60%, #0b1519 100%);
          flex-shrink: 0;
        }

        .login-left::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .login-left::after {
          content: '';
          position: absolute;
          width: 520px;
          height: 520px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.05);
          bottom: -160px;
          right: -160px;
        }

        .login-circle-accent {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          border: 1px solid rgba(164,57,49,0.2);
          bottom: -60px;
          right: -60px;
          z-index: 0;
        }

        .login-deco-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(164,57,49,0.6);
        }

        .login-brand {
          font-family: 'Playfair Display', serif;
          font-size: 2.25rem;
          font-weight: 900;
          color: #ffffff;
          letter-spacing: -0.03em;
          text-decoration: none;
          position: relative;
          z-index: 1;
        }

        .login-brand span { color: #A43931; }

        .login-left-body {
          position: relative;
          z-index: 1;
        }

        .login-left-body h2 {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          font-weight: 400;
          color: rgba(255,255,255,0.9);
          line-height: 1.2;
          margin-bottom: 1.25rem;
        }

        .login-left-body h2 strong {
          font-weight: 900;
          color: #ffffff;
          font-style: italic;
        }

        /* Quote card */
        .quote-card {
          margin-top: 2.5rem;
          padding: 1.75rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          backdrop-filter: blur(20px);
        }

        .quote-card p {
          font-size: 1rem;
          font-style: italic;
          color: rgba(255,255,255,0.75);
          line-height: 1.65;
          margin: 0 0 1rem;
        }

        .quote-card p em {
          color: #e07a74;
          font-style: normal;
          font-weight: 600;
        }

        .quote-rule {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .quote-rule-line {
          width: 32px;
          height: 2px;
          background: #A43931;
          flex-shrink: 0;
        }

        .quote-rule span {
          font-size: 0.6rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.25);
        }

        .login-left-footer {
          position: relative;
          z-index: 1;
          font-size: 0.6875rem;
          color: rgba(255,255,255,0.2);
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        /* ─── Right Panel ─── */
        .login-right {
          flex: 1;
          background: #f7f5f2;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 2rem;
          position: relative;
          overflow: hidden;
        }

        .login-right::before {
          content: '';
          position: absolute;
          top: -200px;
          right: -200px;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(29,67,80,0.04), transparent 70%);
          pointer-events: none;
        }

        .login-card {
          width: 100%;
          max-width: 460px;
          position: relative;
          z-index: 1;
        }

        .form-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #e8e2db;
          border: 1px solid #ddd8d2;
          border-radius: 999px;
          padding: 0.3rem 0.9rem;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #7a6f66;
          margin-bottom: 1.5rem;
        }

        .form-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #1D4350;
        }

        .form-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.75rem;
          font-weight: 900;
          color: #0e1c22;
          line-height: 1.1;
          margin-bottom: 0.5rem;
        }

        .form-subtitle {
          font-size: 0.9375rem;
          color: #8a8480;
          margin-bottom: 2.25rem;
          font-weight: 400;
        }

        /* Error */
        .error-box {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          background: #fff0ef;
          border: 1px solid #f5c6c4;
          border-radius: 12px;
          padding: 0.875rem 1rem;
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
          color: #c0392b;
          font-weight: 500;
        }

        /* Fields */
        .field-group {
          margin-bottom: 1.125rem;
        }

        .field-label {
          display: block;
          font-size: 0.6875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #a09890;
          margin-bottom: 0.5rem;
          padding-left: 2px;
        }

        .field-wrap {
          position: relative;
        }

        .field-icon {
          position: absolute;
          left: 1.1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #c0b8b0;
          pointer-events: none;
          display: flex;
        }

        .field-input {
          width: 100%;
          padding: 0.9rem 1.1rem 0.9rem 3rem;
          background: #ffffff;
          border: 1.5px solid #e8e3de;
          border-radius: 14px;
          font-size: 0.9375rem;
          color: #0e1c22;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }

        .field-input-noicon {
          padding-left: 1.1rem;
        }

        .field-input::placeholder { color: #c8c4bf; }

        .field-input:focus {
          border-color: #1D4350;
          box-shadow: 0 0 0 4px rgba(29,67,80,0.08);
        }

        .field-input:disabled { opacity: 0.6; cursor: not-allowed; }

        .show-btn {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #1D4350;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          opacity: 0.7;
          transition: opacity 0.15s;
        }
        .show-btn:hover { opacity: 1; }

        /* Submit */
        .submit-btn {
          width: 100%;
          margin-top: 0.75rem;
          padding: 1.05rem 1.5rem;
          background: #1D4350;
          color: #ffffff;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 24px rgba(29,67,80,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          position: relative;
          overflow: hidden;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%);
        }

        .submit-btn:hover:not(:disabled) {
          background: #15323b;
          box-shadow: 0 6px 32px rgba(29,67,80,0.35);
          transform: translateY(-1px);
        }

        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .btn-arrow {
          width: 18px;
          height: 18px;
          stroke: white;
          fill: none;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: transform 0.2s;
        }

        .submit-btn:hover .btn-arrow { transform: translateX(3px); }

        /* Spinner */
        .spinner {
          width: 20px;
          height: 20px;
          border: 2.5px solid rgba(255,255,255,0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* Divider */
        .divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1.5rem 0;
          color: #c8c4bf;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e8e3de;
        }

        /* Social buttons */
        .social-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.8rem 1rem;
          background: #ffffff;
          border: 1.5px solid #e8e3de;
          border-radius: 14px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #2c2825;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
        }

        .social-btn:hover {
          border-color: #c8c4bf;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          transform: translateY(-1px);
        }

        /* Sign up link */
        .signup-row {
          text-align: center;
          font-size: 0.875rem;
          color: #9e9890;
        }

        .signup-row button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 700;
          color: #A43931;
          padding: 0;
          font-family: 'DM Sans', sans-serif;
          transition: color 0.15s;
        }

        .signup-row button:hover {
          color: #8a2e26;
          text-decoration: underline;
        }

        @media (max-width: 900px) {
          .login-left { display: none; }
          .login-right {
            padding: 2rem 1.5rem;
            min-height: calc(100vh - 80px);
          }
        }
      `}</style>

      <div className="login-root">
        {/* ── Left Panel ── */}
        <div className="login-left">
          <div className="login-circle-accent" />
          <div className="login-deco-dot" style={{ top: "30%", left: "2.5rem" }} />
          <div className="login-deco-dot" style={{ top: "62%", right: "3rem", opacity: 0.4 }} />

          <div className="login-left-body pt-10">
            <h2>
              Your next<br />
              adventure<br />
              <strong>awaits.</strong>
            </h2>

            <div className="quote-card">
              <p>
                &ldquo;Travel is the only thing you buy<br />
                that makes you <em>richer.</em>&rdquo;
              </p>
              <div className="quote-rule">
                <div className="quote-rule-line" />
                <span>Curated Experience</span>
              </div>
            </div>
          </div>

          <p className="login-left-footer">© 2026 Travio Adventures</p>
        </div>

        {/* ── Right Panel ── */}
        <div className="login-right">
          <div className="login-card">
            <span className="form-eyebrow">
              <span className="form-eyebrow-dot" />
              Secure login
            </span>

            <h1 className="form-title">Welcome back</h1>
            <p className="form-subtitle">Enter your credentials to manage your trips.</p>

            {errorMsg && (
              <div className="error-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="field-group">
                <label className="field-label">Account Email / Username</label>
                <div className="field-wrap">
                  <span className="field-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    required
                    disabled={isLoading}
                    className="field-input"
                    placeholder="john@travio.com"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="field-group">
                <label className="field-label">Password</label>
                <div className="field-wrap">
                  <span className="field-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    disabled={isLoading}
                    className="field-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="show-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={isLoading} className="submit-btn">
                {isLoading ? (
                  <span className="spinner" />
                ) : (
                  <>
                    Login to Travio
                    <svg className="btn-arrow" viewBox="0 0 24 24">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div className="divider">or continue with</div>

            <div className="social-grid">
              <button type="button" className="social-btn">
                <Image
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  width={18}
                  height={18}
                  alt="Google"
                />
                Google
              </button>
              <button type="button" className="social-btn">
                <Image
                  src="https://www.svgrepo.com/show/448234/linkedin.svg"
                  width={18}
                  height={18}
                  alt="LinkedIn"
                />
                LinkedIn
              </button>
            </div>

            <p className="signup-row">
              Don&apos;t have an account?{" "}
              <button type="button" onClick={() => router.push("/register")}>
                Create account
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}