"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Auth from "@/components/Auth/Auth";
import UserProfile from "@/components/UserProfile";

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showProfile, setShowProfile] = useState(false);
  const { currentUser, loading } = useAuth();
  const pathname = usePathname();

  // Close profile automatically when navigating to a new route
  useEffect(() => {
    setShowProfile(false);
  }, [pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground suppressHydrationWarning">
      {/* The Header now only needs the onProfileClick prop! */}
      <Header onProfileClick={() => setShowProfile(true)} />

      <main className="grow container mx-auto px-4 py-8 sm:p-6 lg:p-8">
        {showProfile ? (
          !currentUser ? (
            <Auth onAuthSuccess={() => {}} />
          ) : (
            <UserProfile onClose={() => setShowProfile(false)} />
          )
        ) : (
          children // The content of your page.tsx files will be rendered here
        )}
      </main>

      <Footer />
    </div>
  );
}
