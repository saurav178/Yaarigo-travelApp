"use client";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: { children: ProtectedRouteProps["children"] }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Agar loading khatam ho gayi aur user authenticated nahi hai
    if (!isLoading && !isAuthenticated) {
      router.replace("/"); // replace use karein taaki user back na kar sake login par
    }
  }, [isAuthenticated, isLoading, router]);

  // Jab tak check ho raha hai, ek clean loader dikhayein
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <div className="h-10 w-10 border-4 border-[#1D4350] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Agar authenticated hai tabhi children render honge
  return isAuthenticated ? <>{children}</> : null;
};