'use client';

import { useState, useRef, useEffect } from 'react';
import { useModal } from '@/context/ModalContext';
import { useRouter } from 'next/navigation';

export default function VerifyOTPForm() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const { openModal, closeModal } = useModal();
  const router = useRouter();
  
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
    }
    
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const handleGetOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Replace with actual API call
    // Simulating API call for now
    setTimeout(() => {
      setIsLoading(false);
      setIsOtpSent(true);
      setTimeLeft(15);
      setIsTimerActive(true);
      // Focus first OTP input
      setTimeout(() => otpRefs[0].current?.focus(), 100);
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }
    
    // Only allow numbers
    if (value && !/^\d$/.test(value)) {
      return;
    }
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (timeLeft === 0) {
      alert('OTP expired. Please request a new one.');
      return;
    }
    
    setIsLoading(true);
    
    const otpCode = otp.join('');
    console.log({ mobileNumber, otp: otpCode });
    
    // TODO: Replace with actual API call
    // Simulating API call for now
    setTimeout(() => {
      setIsLoading(false);
      closeModal();
      router.push('/');
    }, 1000);
  };

  const handleResendOTP = () => {
    setOtp(['', '', '', '']);
    setTimeLeft(15);
    setIsTimerActive(true);
    otpRefs[0].current?.focus();
    
    // TODO: Implement resend OTP API call
    console.log('Resending OTP...');
  };

  if (!isOtpSent) {
    return (
      <div className="w-full max-w-md mx-auto animate-fadeIn">
        <div className="glassmorphism-card">
          <div className="text-center mb-5 animate-slideDown">
            <div className="inline-block p-2.5 bg-gradient-to-r from-[#1D4350] to-[#A43931] rounded-full mb-3 animate-bounce-slow">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-[#1D4350] to-[#A43931] bg-clip-text text-transparent">
              Login with OTP
            </h2>
            <p className="text-xs text-gray-600 mt-1">Enter your mobile number to receive OTP</p>
          </div>
          
          <form className="space-y-3" onSubmit={handleGetOTP}>
            <div className="animate-slideUp" style={{ animationDelay: "0.1s" }}>
              <label htmlFor="mobile-number" className="block text-xs font-semibold text-gray-700 mb-1">
                Mobile Number
              </label>
              <div className="relative">
              
                <input
                  id="mobile-number"
                  name="mobileNumber"
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  className="input-field pl-10"
                  placeholder="Enter 10-digit mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">We'll send a verification code to this number</p>
            </div>

            <div className="animate-slideUp pt-1" style={{ animationDelay: "0.2s" }}>
              <button
                type="submit"
                disabled={isLoading || mobileNumber.length !== 10}
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
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      Get OTP
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

            <div className="text-center pt-2 animate-slideUp" style={{ animationDelay: "0.3s" }}>
              <button 
                type="button"
                onClick={() => openModal('login')}
                className="text-xs text-gray-600 hover:text-[#1D4350] transition-all duration-300 font-medium hover:scale-105 inline-block"
              >
                🔑 Use Password Instead
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

  return (
    <div className="w-full max-w-md mx-auto animate-fadeIn">
      <div className="glassmorphism-card">
        <div className="text-center mb-5 animate-slideDown">
          <div className="inline-block p-2.5 bg-gradient-to-r from-[#1D4350] to-[#A43931] rounded-full mb-3 animate-bounce-slow">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-[#1D4350] to-[#A43931] bg-clip-text text-transparent">
            Verify OTP
          </h2>
          <p className="text-xs text-gray-600 mt-1">Enter the code sent to your mobile</p>
        </div>
        
        <form className="space-y-3" onSubmit={handleVerifyOTP}>
          <div className="animate-slideUp" style={{ animationDelay: "0.1s" }}>
            <label htmlFor="mobile-number-display" className="block text-xs font-semibold text-gray-700 mb-1">
              Mobile Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                id="mobile-number-display"
                type="tel"
                disabled
                className="input-field pl-10 pr-20 bg-gray-50 text-gray-700"
                value={mobileNumber}
              />
              <button
                type="button"
                onClick={() => {
                  setIsOtpSent(false);
                  setOtp(['', '', '', '']);
                  setIsTimerActive(false);
                  setTimeLeft(15);
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-[#1D4350] hover:text-[#A43931] font-semibold transition-colors duration-300"
              >
                Change
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">We've sent a 4-digit code to this number</p>
          </div>

          <div className="animate-slideUp" style={{ animationDelay: "0.2s" }}>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Enter OTP
            </label>
            <div className="flex justify-between gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={otpRefs[index]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="otp-input"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                />
              ))}
            </div>
            <div className="flex items-center justify-between mt-2">
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={timeLeft > 0}
                className="text-xs text-gray-600 hover:text-[#1D4350] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Resend OTP
              </button>
              <span className={`text-xs font-semibold ${timeLeft <= 5 ? 'text-red-600' : 'text-gray-600'}`}>
                {timeLeft > 0 ? `${timeLeft}s` : 'Expired'}
              </span>
            </div>
          </div>

          <div className="animate-slideUp pt-1" style={{ animationDelay: "0.3s" }}>
            <button
              type="submit"
              disabled={isLoading || otp.some(digit => !digit) || timeLeft === 0}
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
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify & Login
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

        .input-field:hover:not(:disabled) {
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

        .otp-input {
          width: 3.5rem;
          height: 3.5rem;
          text-align: center;
          font-size: 1.25rem;
          font-weight: 600;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .otp-input:hover {
          border-color: #d1d5db;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .otp-input:focus {
          outline: none;
          border-color: #1d4350;
          box-shadow: 0 0 0 3px rgba(29, 67, 80, 0.1),
            0 4px 6px rgba(0, 0, 0, 0.05);
          background: white;
          transform: scale(1.05);
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
          
          .otp-input {
            width: 3rem;
            height: 3rem;
            font-size: 1.125rem;
          }
        }
      `}</style>
    </div>
  );
}