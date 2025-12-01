'use client';

import { useState } from 'react';
import { useModal } from '@/context/ModalContext';

export default function ForgotPasswordForm() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { openModal, closeModal } = useModal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log({ emailOrPhone });
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Password reset link sent to your email/phone!');
      closeModal();
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fadeIn">
      <div className="glassmorphism-card">
        {/* Header */}
        <div className="text-center mb-5 animate-slideDown">
          <div className="inline-block p-2.5 bg-gradient-to-r from-[#1D4350] to-[#A43931] rounded-full mb-3 animate-bounce-slow">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-[#1D4350] to-[#A43931] bg-clip-text text-transparent">
            Forgot Password
          </h2>
          <p className="text-xs text-gray-600 mt-1">We'll send you a reset link</p>
        </div>
        
        {/* Form Content */}
        <form className="space-y-3" onSubmit={handleSubmit}>
          {/* Email/Phone Input */}
          <div className="animate-slideUp" style={{ animationDelay: "0.1s" }}>
            <label htmlFor="email-or-phone" className="block text-xs font-semibold text-gray-700 mb-1">
              Email or Phone
            </label>
            <div className="relative group">
              <input
                id="email-or-phone"
                name="emailOrPhone"
                type="text"
                required
                className="input-field"
                placeholder="Enter your email or phone number"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">We'll send a reset link to this email or phone</p>
          </div>

          {/* Reset Password Button */}
          <div className="animate-slideUp pt-1" style={{ animationDelay: "0.2s" }}>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-gradient group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending Reset Link...
                  </>
                ) : (
                  <>
                    Send Reset Link
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Back to Login Link */}
          <div
            className="text-center pt-2 animate-slideUp"
            style={{ animationDelay: "0.3s" }}
          >
            <button 
              type="button"
              onClick={() => openModal('login')}
              className="text-xs text-gray-600 hover:text-[#1D4350] inline-flex items-center transition-all duration-300 font-medium hover:scale-105"
            >
              <svg className="h-3.5 w-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Login
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .glassmorphism-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
            0 2px 8px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .input-field {
          appearance: none;
          display: block;
          width: 100%;
          padding: 10px 12px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 14px;
          color: #1f2937;
          background: rgba(255, 255, 255, 0.9);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .input-field:hover {
          border-color: #d1d5db;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .input-field:focus {
          outline: none;
          border-color: #1d4350;
          box-shadow: 0 0 0 3px rgba(29, 67, 80, 0.1),
            0 4px 6px rgba(0, 0, 0, 0.05);
          background: white;
          transform: translateY(-1px);
        }

        .btn-gradient {
          width: 100%;
          padding: 10px;
          font-size: 15px;
          font-weight: 700;
          color: white;
          background: linear-gradient(135deg, #1d4350 0%, #a43931 100%);
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(29, 67, 80, 0.3);
        }

        .btn-gradient::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #a43931 0%, #1d4350 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .btn-gradient:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(29, 67, 80, 0.4);
        }

        .btn-gradient:hover:not(:disabled)::before {
          opacity: 1;
        }

        .btn-gradient:active:not(:disabled) {
          transform: translateY(0);
        }

        .btn-gradient:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out both;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        @media (max-width: 640px) {
          .glassmorphism-card {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}