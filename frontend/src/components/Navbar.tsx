"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signOut, onAuthStateChanged, User } from "firebase/auth";

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/upload", label: "Verify Content" },
    { href: "/verify", label: "Public Verification" },
    { href: "/history", label: "History" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md transition-transform group-hover:scale-105">
              <path d="M12 22C12 22 3.5 16 3.5 7L12 3L20.5 7C20.5 16 12 22 12 22Z" fill="#166534"/>
              <path d="M12 22C12 22 3.5 16 3.5 7L12 3" fill="#14532d"/>
              <path d="M12 18.5C12 18.5 6 13.5 6 8L12 5.5L18 8C18 13.5 12 18.5 12 18.5Z" fill="#f8fafc"/>
              <path d="M9 11L11.5 13.5L16 7" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex flex-col justify-center pt-1">
            <span className="text-[28px] font-black text-gray-800 tracking-tight leading-none" style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
              VISTA
            </span>
            <span className="text-[9px] font-medium text-gray-500 leading-tight mt-0.5 tracking-wide uppercase">
              Verification and Integrity Screening Technology
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-[#0F7642]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Auth / CTA */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">
                {user.displayName || user.email || user.phoneNumber}
              </span>
              <button
                onClick={handleSignOut}
                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="text-sm font-medium text-[#0F7642] hover:text-[#0b5e34] transition-colors"
            >
              Sign In
            </Link>
          )}

          <Link
            href="/upload"
            className="flex items-center gap-2 rounded-lg bg-[#0F7642] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0b5e34] transition-all duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Analyze Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-500 hover:text-gray-900 p-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
