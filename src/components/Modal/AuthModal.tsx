"use client";

import { useModal } from "../../context/ModalContext";
import LoginForm from "../../app/(auth)/login/LoginForm";
import RegisterForm from "../../app/(auth)/register/RegisterForm";
import ForgotPasswordForm from "../../app/(auth)/forgot-password/ForgotPasswordForm";
import VerifyOTPForm from "../../app/(auth)/verify-otp/VerifyOTPForm";

export default function AuthModal() {
  const { activeModal, closeModal } = useModal();

  if (!activeModal) return null;

  const renderForm = () => {
    switch (activeModal) {
      case "login":
        return <LoginForm />;
      case "register":
        return <RegisterForm />;
      case "forgot-password":
        return <ForgotPasswordForm />;
      case "verify-otp":
        return <VerifyOTPForm />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/30 backdrop-blur-md">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-6">{renderForm()}</div>
      </div>
    </div>
  );
}
