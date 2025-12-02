// "use client";

// import { useModal } from '@/context/ModalContext';
// import LoginForm from '@/app/(auth)/login/LoginForm';
// import RegisterForm from '@/app/(auth)/register/RegisterForm';
// import ForgotPasswordForm from '@/app/(auth)/forgot-password/ForgotPasswordForm';
// import VerifyOTPForm from '@/app/(auth)/verify-otp/VerifyOTPForm';

// export default function AuthModal() {
//   const { activeModal, closeModal } = useModal();

//   if (!activeModal) return null;

//   const renderForm = () => {
//     switch (activeModal) {
//       case 'login':
//         return <LoginForm />;
//       case 'register':
//         return <RegisterForm />;
//       case 'forgot-password':
//         return <ForgotPasswordForm />;
//       case 'verify-otp':
//         return <VerifyOTPForm />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
//       <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//         <button
//           onClick={closeModal}
//           className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
//         >
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
        
//         <div className="p-6">
//           {renderForm()}
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useModal } from '@/context/ModalContext';
import LoginForm from '@/app/(auth)/login/LoginForm';
import RegisterForm from '@/app/(auth)/register/RegisterForm';
import ForgotPasswordForm from '@/app/(auth)/forgot-password/ForgotPasswordForm';
import VerifyOTPForm from '@/app/(auth)/verify-otp/VerifyOTPForm';

export default function AuthModal() {
  const { activeModal, closeModal } = useModal();

  if (!activeModal) return null;

  const renderForm = () => {
    switch (activeModal) {
      case 'login':
        return <LoginForm />;
      case 'register':
        return <RegisterForm />;
      case 'forgot-password':
        return <ForgotPasswordForm />;
      case 'verify-otp':
        return <VerifyOTPForm />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Very light overlay with subtle blur */}
      <div 
        className="absolute inset-0 bg-white/20 backdrop-blur-sm"
        onClick={closeModal}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full border border-gray-200 overflow-hidden">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-6">
          {renderForm()}
        </div>
      </div>
    </div>
  );
}



//with animation
// "use client";

// import { useModal } from '@/context/ModalContext';
// import LoginForm from '@/app/(auth)/login/LoginForm';
// import RegisterForm from '@/app/(auth)/register/RegisterForm';
// import ForgotPasswordForm from '@/app/(auth)/forgot-password/ForgotPasswordForm';
// import VerifyOTPForm from '@/app/(auth)/verify-otp/VerifyOTPForm';
// import { useEffect } from 'react';

// export default function AuthModal() {
//   const { activeModal, closeModal } = useModal();

//   useEffect(() => {
//     if (activeModal) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }

//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [activeModal]);

//   if (!activeModal) return null;

//   const renderForm = () => {
//     switch (activeModal) {
//       case 'login':
//         return <LoginForm />;
//       case 'register':
//         return <RegisterForm />;
//       case 'forgot-password':
//         return <ForgotPasswordForm />;
//       case 'verify-otp':
//         return <VerifyOTPForm />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
//         {/* Enhanced Gradient Overlay with Blur */}
//         <div 
//           className="modal-overlay"
//           onClick={closeModal}
//         />
        
//         {/* Modal Container */}
//         <div className="modal-container">
//           {/* Close Button */}
//           <button
//             onClick={closeModal}
//             className="modal-close"
//             aria-label="Close modal"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
          
//           {/* Modal Content */}
//           <div className="modal-content">
//             {renderForm()}
//           </div>

//           {/* Floating Particles Animation */}
//           <div className="particles">
//             <div className="particle particle-1"></div>
//             <div className="particle particle-2"></div>
//             <div className="particle particle-3"></div>
//             <div className="particle particle-4"></div>
//             <div className="particle particle-5"></div>
//             <div className="particle particle-6"></div>
//           </div>

//           {/* Decorative Corner Gradients */}
//           <div className="corner-gradient corner-tl"></div>
//           <div className="corner-gradient corner-br"></div>
//         </div>
//       </div>

//       <style jsx>{`
//         .modal-overlay {
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(
//             135deg,
//             rgba(29, 67, 80, 0.85) 0%,
//             rgba(164, 57, 49, 0.7) 50%,
//             rgba(29, 67, 80, 0.85) 100%
//           );
//           backdrop-filter: blur(16px);
//           -webkit-backdrop-filter: blur(16px);
//           animation: overlayFadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
//         }

//         @keyframes overlayFadeIn {
//           from {
//             opacity: 0;
//             backdrop-filter: blur(0px);
//           }
//           to {
//             opacity: 1;
//             backdrop-filter: blur(16px);
//           }
//         }

//         .modal-container {
//           position: relative;
//           width: 100%;
//           max-width: 500px;
//           z-index: 10;
//           animation: modalSlideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
//           margin: auto;
//         }

//         @keyframes modalSlideUp {
//           from {
//             opacity: 0;
//             transform: translateY(50px) scale(0.9);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }

//         .modal-close {
//           position: absolute;
//           top: -14px;
//           right: -14px;
//           z-index: 20;
//           background: linear-gradient(135deg, #1D4350 0%, #A43931 100%);
//           border: 3px solid white;
//           width: 44px;
//           height: 44px;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           color: white;
//           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//           box-shadow: 0 8px 24px rgba(29, 67, 80, 0.5);
//         }

//         .modal-close:hover {
//           transform: rotate(90deg) scale(1.15);
//           box-shadow: 0 12px 32px rgba(164, 57, 49, 0.6);
//           background: linear-gradient(135deg, #A43931 0%, #1D4350 100%);
//         }

//         .modal-close:active {
//           transform: rotate(90deg) scale(1.05);
//         }

//         .modal-content {
//           position: relative;
//           z-index: 2;
//           background: rgba(255, 255, 255, 0.98);
//           backdrop-filter: blur(20px);
//           -webkit-backdrop-filter: blur(20px);
//           border-radius: 28px;
//           padding: 0;
//           box-shadow: 
//             0 20px 60px rgba(0, 0, 0, 0.3),
//             0 0 0 1px rgba(255, 255, 255, 0.5),
//             inset 0 1px 0 rgba(255, 255, 255, 0.9);
//           border: 1px solid rgba(255, 255, 255, 0.3);
//           overflow: hidden;
//         }

//         /* Floating Particles */
//         .particles {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           pointer-events: none;
//           overflow: hidden;
//           border-radius: 28px;
//           z-index: 1;
//         }

//         .particle {
//           position: absolute;
//           background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%);
//           border-radius: 50%;
//           pointer-events: none;
//           filter: blur(1px);
//         }

//         .particle-1 {
//           width: 6px;
//           height: 6px;
//           top: 15%;
//           left: 10%;
//           animation: float1 8s ease-in-out infinite;
//         }

//         .particle-2 {
//           width: 8px;
//           height: 8px;
//           top: 60%;
//           left: 85%;
//           animation: float2 10s ease-in-out infinite;
//         }

//         .particle-3 {
//           width: 4px;
//           height: 4px;
//           top: 35%;
//           left: 15%;
//           animation: float3 9s ease-in-out infinite;
//         }

//         .particle-4 {
//           width: 5px;
//           height: 5px;
//           top: 80%;
//           left: 75%;
//           animation: float4 11s ease-in-out infinite;
//         }

//         .particle-5 {
//           width: 7px;
//           height: 7px;
//           top: 25%;
//           left: 90%;
//           animation: float1 7s ease-in-out infinite 1s;
//         }

//         .particle-6 {
//           width: 4px;
//           height: 4px;
//           top: 70%;
//           left: 20%;
//           animation: float2 12s ease-in-out infinite 2s;
//         }

//         @keyframes float1 {
//           0%, 100% {
//             transform: translate(0, 0) scale(1);
//             opacity: 0;
//           }
//           10% {
//             opacity: 1;
//           }
//           50% {
//             transform: translate(-25px, -40px) scale(1.3);
//             opacity: 0.8;
//           }
//           90% {
//             opacity: 1;
//           }
//         }

//         @keyframes float2 {
//           0%, 100% {
//             transform: translate(0, 0) rotate(0deg);
//             opacity: 0;
//           }
//           10% {
//             opacity: 1;
//           }
//           50% {
//             transform: translate(30px, -35px) rotate(180deg);
//             opacity: 0.9;
//           }
//           90% {
//             opacity: 1;
//           }
//         }

//         @keyframes float3 {
//           0%, 100% {
//             transform: translate(0, 0);
//             opacity: 0;
//           }
//           10% {
//             opacity: 1;
//           }
//           50% {
//             transform: translate(20px, -50px);
//             opacity: 0.7;
//           }
//           90% {
//             opacity: 1;
//           }
//         }

//         @keyframes float4 {
//           0%, 100% {
//             transform: translate(0, 0) scale(1);
//             opacity: 0;
//           }
//           10% {
//             opacity: 1;
//           }
//           50% {
//             transform: translate(-35px, -30px) scale(1.5);
//             opacity: 0.85;
//           }
//           90% {
//             opacity: 1;
//           }
//         }

//         /* Decorative Corner Gradients */
//         .corner-gradient {
//           position: absolute;
//           width: 150px;
//           height: 150px;
//           border-radius: 50%;
//           pointer-events: none;
//           filter: blur(40px);
//           opacity: 0.15;
//           z-index: 0;
//         }

//         .corner-tl {
//           top: -50px;
//           left: -50px;
//           background: linear-gradient(135deg, #1D4350 0%, #A43931 100%);
//           animation: pulse1 4s ease-in-out infinite;
//         }

//         .corner-br {
//           bottom: -50px;
//           right: -50px;
//           background: linear-gradient(135deg, #A43931 0%, #1D4350 100%);
//           animation: pulse2 4s ease-in-out infinite;
//         }

//         @keyframes pulse1 {
//           0%, 100% {
//             transform: scale(1);
//             opacity: 0.15;
//           }
//           50% {
//             transform: scale(1.2);
//             opacity: 0.25;
//           }
//         }

//         @keyframes pulse2 {
//           0%, 100% {
//             transform: scale(1);
//             opacity: 0.15;
//           }
//           50% {
//             transform: scale(1.3);
//             opacity: 0.2;
//           }
//         }

//         /* Responsive Styles */
//         @media (max-width: 640px) {
//           .modal-container {
//             max-width: calc(100% - 16px);
//             margin: 10px auto;
//           }

//           .modal-close {
//             top: 10px;
//             right: 10px;
//             width: 40px;
//             height: 40px;
//             border-width: 2px;
//           }

//           .modal-content {
//             border-radius: 24px;
//           }

//           .corner-gradient {
//             width: 100px;
//             height: 100px;
//           }

//           .corner-tl {
//             top: -30px;
//             left: -30px;
//           }

//           .corner-br {
//             bottom: -30px;
//             right: -30px;
//           }
//         }

//         @media (max-height: 700px) {
//           .modal-container {
//             margin: 20px auto;
//           }
//         }

//         /* Smooth scrollbar for modal content */
//         .modal-content::-webkit-scrollbar {
//           width: 6px;
//         }

//         .modal-content::-webkit-scrollbar-track {
//           background: rgba(0, 0, 0, 0.05);
//           border-radius: 10px;
//         }

//         .modal-content::-webkit-scrollbar-thumb {
//           background: linear-gradient(135deg, #1D4350 0%, #A43931 100%);
//           border-radius: 10px;
//         }

//         .modal-content::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(135deg, #A43931 0%, #1D4350 100%);
//         }
//       `}</style>
//     </>
//   );
// }