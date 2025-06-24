"use client";

import { useSession, signOut } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UserMenu() {
  const { data: session } = useSession();
  const user = session?.user;
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  if (!user) return null;

  return (
    <div className="flex justify-end items-center w-full mt-4">
      <div className="relative mr-4" ref={menuRef}>
        <button
          className="focus:outline-none"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Ouvrir le menu utilisateur"
        >
          <img
            src={user?.profilePicture || 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'}
            alt="Photo de profil"
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 shadow-sm hover:ring-2 hover:ring-blue-400 transition-all"
          />
        </button>
        {/* Menu déroulant */}
        {menuOpen && (
          <div className="absolute right-0 top-12 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setMenuOpen(false);
                router.push('/profile');
              }}
            >
              Mon profil
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 rounded-b-lg"
              onClick={() => {
                setMenuOpen(false);
                signOut({ callbackUrl: '/login' });
              }}
            >
              Se déconnecter
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 