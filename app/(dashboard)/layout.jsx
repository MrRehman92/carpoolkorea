"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function DashboardGroupLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      const domain = process.env.NEXT_PUBLIC_DOMAIN;
      document.cookie = `isAuthenticated=; Path=/; Max-Age=0; Domain=${domain}; Secure; SameSite=None;`;
      // router.replace("/login");
      window.location.href = "/login";
    }
  }, [user, loading, router]);

  if (loading) return (
    <>
      <div className="min-h-screen bg-gray-50">{children}</div>
      {/* <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div> */}
    </>);
  if (!user) return null;

  // console.log("Authenticated user:", user);

  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
