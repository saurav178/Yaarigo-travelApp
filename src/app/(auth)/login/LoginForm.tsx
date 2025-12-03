// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function LoginForm() {
//   const [emailOrPhone, setEmailOrPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     // TODO: Implement actual login logic
//     console.log({ emailOrPhone, password, rememberMe });

//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);
//       // Redirect to dashboard or home page after successful login
//       router.push('/');
//     }, 1000);
//   };

//    return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20 pb-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-sm w-full bg-white shadow-lg border border-gray-200 p-8 transition-all duration-300 hover:shadow-xl">
//         <div>
//           <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
//             Login
//           </h2>
//         </div>
//         <form className="space-y-5" onSubmit={handleSubmit}>
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="email-or-phone" className="block text-xs font-medium text-gray-700 mb-1.5">
//                 Email or Phone
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//                 <input
//                   id="email-or-phone"
//                   name="emailOrPhone"
//                   type="text"
//                   required
//                   className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1D4350] focus:border-[#1D4350] text-sm transition-all duration-200 ease-in-out hover:border-gray-400 hover:shadow-sm"
//                   placeholder="Enter your email or phone number"
//                   value={emailOrPhone}
//                   onChange={(e) => setEmailOrPhone(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1.5">
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
//                   </svg>
//                 </div>
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   required
//                   className="appearance-none block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1D4350] focus:border-[#1D4350] text-sm transition-all duration-200 ease-in-out hover:border-gray-400 hover:shadow-sm"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center transition-colors duration-200 hover:text-gray-600"
//                 >
//                   {showPassword ? (
//                     <svg className="h-4 w-4 text-gray-400 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                     </svg>
//                   ) : (
//                     <svg className="h-4 w-4 text-gray-400 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//               <p className="text-xs text-gray-400 mt-1">Hint text</p>
//             </div>
//           </div>

//           <div className="flex items-center justify-between text-xs">
//             <div className="flex items-center">
//               <input
//                 id="remember-me"
//                 name="remember-me"
//                 type="checkbox"
//                 className="h-3.5 w-3.5 text-[#1D4350] focus:ring-2 focus:ring-[#1D4350] border-gray-300 rounded transition-colors duration-200 hover:border-gray-400"
//                 checked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//               />
//               <label htmlFor="remember-me" className="ml-2 block text-gray-700">
//                 Remember me
//               </label>
//             </div>

//             <div>
//               <a href="/forgot-password" className="font-medium text-[#1D4350] hover:text-[#16353f] transition-colors duration-200">
//                 Forgot Password?
//               </a>
//             </div>
//           </div>

//           <div className="text-center">
//             <a href="/verify-otp" className="text-xs text-gray-600 hover:text-[#1D4350] transition-colors duration-200">
//               Use OTP Instead
//             </a>
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#1D4350] hover:bg-[#16353f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1D4350] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
//             >
//               {isLoading ? 'Logging in...' : 'Login'}
//             </button>
//           </div>

//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300"></div>
//             </div>
//             <div className="relative flex justify-center text-xs">
//               <span className="px-2 bg-white text-gray-500">OR</span>
//             </div>
//           </div>

//           <div className="grid grid-cols-3 gap-3">
//             <button
//               type="button"
//               className="flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 ease-in-out hover:shadow-md hover:border-gray-400"
//             >
//               <svg className="h-5 w-5" viewBox="0 0 24 24">
//                 <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                 <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                 <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                 <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//               </svg>
//             </button>
//             <button
//               type="button"
//               className="flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 ease-in-out hover:shadow-md hover:border-gray-400"
//             >
//               <svg className="h-5 w-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//               </svg>
//             </button>
//             <button
//               type="button"
//               className="flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 ease-in-out hover:shadow-md hover:border-gray-400"
//             >
//               <svg className="h-5 w-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M6.62 10.79a8.5 8.5 0 0115.56 3.71h-2.87a5.75 5.75 0 00-10.69-2.49l-2 2.77zm-.82 2.42l-2 2.77A8.5 8.5 0 009.5 21.5v-3.25a5.75 5.75 0 01-3.7-4.79v-.25zm10.7-2.42l2-2.77A8.5 8.5 0 0014.5 2.5v3.25a5.75 5.75 0 013.7 4.79v.25z"/>
//               </svg>
//             </button>
//           </div>

//           <div className="text-center">
//             <span className="text-xs text-gray-600">
//               Don't have an account?{' '}
//               <a href="/register" className="font-medium text-[#EA6A6A] hover:text-[#d85a5a] transition-colors duration-200">
//                 Create Account
//               </a>
//             </span>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

//with animation

"use client";

import { useState } from "react";
import { useModal } from "@/context/ModalContext";

import { ROUTES } from "../../../lib/routes";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { openModal, closeModal } = useModal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone, password }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        setIsLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);

      closeModal();
    } catch (err) {
      console.error(err);
      alert("Server error.");
    } finally {
      setIsLoading(false);
    }
  };

  const router = useRouter();

  const handleVerification = () => {
    router.push(ROUTES.VERIFICATION);
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fadeIn">
      {/* <div className="glassmorphism-card"> */}
        {/* Header with gradient animation */}
        <div className="text-center mb-5 animate-slideDown">
          <div className="inline-block p-2.5 bg gradient-to-r from-[#1D4350] to-[#A43931] rounded-full mb-3 animate-bounce-slow">
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
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold bg gradient-to-r from-[#1D4350] to-[#A43931] bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            Login to continue your journey with Travio
          </p>
        </div>

        {/* Form Content */}
        <form className="space-y-3" onSubmit={handleSubmit}>
          {/* Email/Phone Input */}
          <div className="animate-slideUp" style={{ animationDelay: "0.1s" }}>
            <label
              htmlFor="email-or-phone"
              className="block text-xs font-semibold text-gray-700 mb-1"
            >
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
          </div>

          {/* Password Input */}
          <div className="animate-slideUp" style={{ animationDelay: "0.2s" }}>
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative group">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="input-field pr-10"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center transition-all duration-300 hover:scale-110"
              >
                {showPassword ? (
                  <svg
                    className="h-4 w-4 text-gray-400 hover:text-[#1D4350] transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4 text-gray-400 hover:text-[#1D4350] transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div
            className="flex items-center justify-between text-sm animate-slideUp"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="custom-checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-gray-700 font-medium text-xs"
              >
                Remember me
              </label>
            </div>

            <button
              type="button"
              onClick={() => openModal("forgot-password")}
              className="font-semibold text-xs text-[#1D4350] hover:text-[#A43931] transition-all duration-300"
            >
              Forgot Password?
            </button>
          </div>

          {/* Use OTP Instead */}
          <div
            className="text-center animate-slideUp"
            style={{ animationDelay: "0.4s" }}
          >
            <button
              type="button"
              onClick={() => openModal("verify-otp")}
              className="text-xs text-gray-600 hover:text-[#1D4350] transition-all duration-300 font-medium hover:scale-105 inline-block"
            >
              🔐 Use OTP Instead
            </button>
          </div>

          {/* Login Button */}

          <div className="animate-slideUp" style={{ animationDelay: "0.5s" }}>
            <button
            onClick={handleVerification}

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
                    Logging in...
                  </>
                ) : (
                  <>
                    Login
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

          {/* Divider */}
          <div
            className="relative animate-slideUp py-2"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-gray-500 font-medium">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div
            className="grid grid-cols-3 gap-3 animate-slideUp"
            style={{ animationDelay: "0.7s" }}
          >
            <button type="button" className="social-btn group">
              <svg className="h-5 w-5 transform group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </button>
            <button type="button" className="social-btn group">
              <svg
                className="h-5 w-5 text-[#1877F2] transform group-hover:scale-110 transition-transform duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button type="button" className="social-btn group">
              <svg
                className="h-5 w-5 text-gray-900 transform group-hover:scale-110 transition-transform duration-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
              </svg>
            </button>
          </div>

          {/* Sign Up Link */}
          <div
            className="text-center pt-3 animate-slideUp"
            style={{ animationDelay: "0.8s" }}
          >
            <span className="text-xs text-gray-600">
              Do not have an account?{" "}
              <button
                type="button"
                onClick={() => openModal("register")}
                className="font-bold text-transparent bg-clip-text bg gradient-to-r from-[#1D4350] to-[#A43931] hover:from-[#A43931] hover:to-[#1D4350] transition-all duration-300 hover:scale-105 inline-block"           >
                Create Account
              </button>
            </span>
          </div>
        </form>
      {/* </div> */}

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

        .custom-checkbox {
          width: 16px;
          height: 16px;
          border: 2px solid #d1d5db;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s;
          appearance: none;
          background: white;
          position: relative;
          flex-shrink: 0;
        }

        .custom-checkbox:checked {
          background: linear-gradient(135deg, #1d4350 0%, #a43931 100%);
          border-color: #1d4350;
        }

        .custom-checkbox:checked::after {
          content: "✓";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 10px;
          font-weight: bold;
        }

        .custom-checkbox:hover {
          border-color: #1d4350;
          transform: scale(1.1);
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

        .social-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.9);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .social-btn:hover {
          border-color: #1d4350;
          background: white;
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
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
