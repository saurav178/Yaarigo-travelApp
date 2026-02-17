"use client";

import { useState } from "react";
import { useModal } from "../../../context/ModalContext";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { RegisterData } from "../../../types/auth";

export default function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { register } = useAuth();
  const { openModal, closeModal } = useModal();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const payload: RegisterData = {
      email: email.trim(),
      full_name: fullName.trim(),
      password: password,
      phone_number: phoneNumber.trim() || "+910000000000",
      role: "INDIVIDUAL",
      organization_name: "Travio User",
    };

    try {
      await register(payload);
      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
        closeModal();
        router.push("/login");
        setTimeout(() => openModal("login"), 400);
      }, 2000);
    } catch (error: unknown) {
      let message = "Registration Failed. Please try again.";
      if (error instanceof Error) message = error.message;
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        .register-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          display: flex;
          background: #0e1c22;
        }

        /* ─── Left Panel ─── */
        .register-left {
          width: 42%;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 3.5rem;
          background: linear-gradient(160deg, #1a3340 0%, #0e1c22 60%, #0b1519 100%);
        }

        /* Subtle grid texture */
        .register-left::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        /* Large decorative circle */
        .register-left::after {
          content: '';
          position: absolute;
          width: 520px;
          height: 520px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.05);
          bottom: -160px;
          right: -160px;
        }

        .circle-accent {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          border: 1px solid rgba(164,57,49,0.2);
          bottom: -60px;
          right: -60px;
        }

        .deco-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(164,57,49,0.6);
        }

        .brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 2.25rem;
          font-weight: 900;
          color: #ffffff;
          letter-spacing: -0.03em;
          text-decoration: none;
          position: relative;
          z-index: 1;
        }

        .brand-name span {
          color: #A43931;
        }

        .left-headline {
          position: relative;
          z-index: 1;
        }

        .left-headline h2 {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          font-weight: 400;
          color: rgba(255,255,255,0.9);
          line-height: 1.2;
          margin-bottom: 1.25rem;
        }

        .left-headline h2 strong {
          font-weight: 900;
          color: #ffffff;
          font-style: italic;
        }

        .left-headline p {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.4);
          max-width: 260px;
          line-height: 1.7;
        }

        .left-perks {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 3rem;
        }

        .perk-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .perk-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .perk-icon svg {
          width: 16px;
          height: 16px;
          stroke: rgba(164,57,49,0.9);
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .perk-text {
          font-size: 0.8125rem;
          color: rgba(255,255,255,0.55);
          font-weight: 400;
        }

        .left-footer {
          position: relative;
          z-index: 1;
          font-size: 0.6875rem;
          color: rgba(255,255,255,0.2);
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        /* ─── Right Panel ─── */
        .register-right {
          flex: 1;
          background: #f7f5f2;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 2rem;
          position: relative;
          overflow: hidden;
        }

        .register-right::before {
          content: '';
          position: absolute;
          top: -200px;
          right: -200px;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(29,67,80,0.04), transparent 70%);
        }

        .form-card {
          width: 100%;
          max-width: 480px;
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
          background: #A43931;
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

        .field-input {
          width: 100%;
          padding: 0.9rem 1.1rem;
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

        .field-input::placeholder {
          color: #c8c4bf;
        }

        .field-input:focus {
          border-color: #1D4350;
          box-shadow: 0 0 0 4px rgba(29,67,80,0.08);
        }

        .field-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .password-wrap {
          position: relative;
        }

        .password-wrap .field-input {
          padding-right: 4.5rem;
        }

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

        .show-btn:hover {
          opacity: 1;
        }

        /* Submit Button */
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

        .submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

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

        .submit-btn:hover .btn-arrow {
          transform: translateX(3px);
        }

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

        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e8e3de;
        }

        /* Sign In Link */
        .signin-row {
          text-align: center;
          font-size: 0.875rem;
          color: #9e9890;
        }

        .signin-row button {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 700;
          color: #1D4350;
          padding: 0;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          transition: color 0.15s;
        }

        .signin-row button:hover {
          color: #A43931;
          text-decoration: underline;
        }

        /* Success Overlay */
        .success-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(14,28,34,0.7);
          backdrop-filter: blur(12px);
        }

        .success-card {
          text-align: center;
          padding: 3rem 3.5rem;
          border-radius: 24px;
          background: #ffffff;
          box-shadow: 0 32px 80px rgba(0,0,0,0.25);
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: successPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes successPop {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }

        .success-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1D4350, #2a6070);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          box-shadow: 0 8px 32px rgba(29,67,80,0.35);
        }

        .success-icon svg {
          width: 36px;
          height: 36px;
          stroke: white;
          fill: none;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .success-card h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.75rem;
          font-weight: 900;
          color: #0e1c22;
          margin-bottom: 0.4rem;
        }

        .success-card p {
          font-size: 0.9rem;
          color: #9e9890;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .register-root { flex-direction: column; }
          .register-left { width: 100%; padding: 2.5rem 2rem; min-height: 260px; }
          .left-perks { display: none; }
          .two-col { grid-template-columns: 1fr; gap: 0; }
        }
      `}</style>

      {/* Success Overlay */}
      {showSuccessToast && (
        <div className="success-overlay">
          <div className="success-card">
            <div className="success-icon">
              <svg viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3>Welcome to Travio!</h3>
            <p>Account created. Opening login…</p>
          </div>
        </div>
      )}

      <div className="register-root">
        {/* ── Left Panel ── */}
        <div className="register-left">
          <div className="circle-accent" />
          <div className="deco-dot" style={{ top: "30%", left: "2.5rem" }} />
          <div className="deco-dot" style={{ top: "60%", right: "3rem", opacity: 0.4 }} />

    
          <div className="left-headline pt-10">
            <h2>
              Explore the<br />
              world <strong>boldly.</strong>
            </h2>
            <p>
              Create your free account and unlock curated adventures, expert itineraries, and unforgettable experiences.
            </p>

            <div className="left-perks">
              {[
                {
                  label: "Personalised trip recommendations",
                  icon: (
                    <svg viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  ),
                },
                {
                  label: "Real-time availability & pricing",
                  icon: (
                    <svg viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  ),
                },
                {
                  label: "Secure bookings & 24/7 support",
                  icon: (
                    <svg viewBox="0 0 24 24">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  ),
                },
              ].map(({ label, icon }) => (
                <div key={label} className="perk-item">
                  <div className="perk-icon">{icon}</div>
                  <span className="perk-text">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="left-footer">© 2026 Travio Adventures</p>
        </div>

        {/* ── Right Panel ── */}
        <div className="register-right">
          <div className="form-card">
            <span className="form-eyebrow">
              <span className="form-eyebrow-dot" />
              Free to join
            </span>

            <h1 className="form-title">Create Account</h1>
            <p className="form-subtitle">Sign up to explore the world.</p>

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
              {/* Full Name */}
              <div className="field-group">
                <label className="field-label">Full Name</label>
                <input
                  type="text"
                  required
                  disabled={isLoading}
                  className="field-input"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              {/* Email + Phone */}
              <div className="two-col">
                <div className="field-group">
                  <label className="field-label">Email</label>
                  <input
                    type="email"
                    required
                    disabled={isLoading}
                    className="field-input"
                    placeholder="john@travio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Phone</label>
                  <input
                    type="tel"
                    required
                    disabled={isLoading}
                    className="field-input"
                    placeholder="+91 98765 43210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="field-group">
                <label className="field-label">Password</label>
                <div className="password-wrap">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    disabled={isLoading}
                    className="field-input"
                    placeholder="Min. 8 characters"
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
                  "Creating Account…"
                ) : (
                  <>
                    Create Free Account
                    <svg className="btn-arrow" viewBox="0 0 24 24">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div className="divider">or</div>

            <p className="signin-row">
              Already have an account?{" "}
              <button
                onClick={() => {
                  closeModal();
                  router.push("/login");
                  setTimeout(() => openModal("login"), 100);
                }}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}