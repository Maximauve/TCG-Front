"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermer le dropdown si clic en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/">
          <span className="text-xl font-bold text-blue-700">TCG</span>
        </Link>
      </div>
      <div className="flex gap-6 items-center">
        <Link href="/" className="text-gray-700 hover:text-blue-700 font-medium transition-colors">Accueil</Link>
        {status === "authenticated" && session?.user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-2 focus:outline-none"
              onClick={() => setDropdownOpen((open) => !open)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              {session.user.profilePicture && (
                <img src={session.user.profilePicture} alt="avatar" className="w-8 h-8 rounded-full border" />
              )}
              <span className="font-semibold text-blue-700">{session.user.username || session.user.email}</span>
              <svg className="w-4 h-4 ml-1 text-blue-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <Link
                  href={`/profile/${session.user.id}`}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors rounded-t-lg"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profil
                </Link>
                <button
                  onClick={() => { setDropdownOpen(false); signOut({ callbackUrl: "/login" }); }}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors rounded-b-lg"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/register" className="text-gray-700 hover:text-blue-700 font-medium transition-colors">Inscription</Link>
            <Link href="/login" className="text-gray-700 hover:text-blue-700 font-medium transition-colors">Connexion</Link>
          </>
        )}
      </div>
    </nav>
  );
} 