
'use client';

import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function AutoLogout() {

  useEffect(() => {
    signOut({ callbackUrl: '/login' });
  }, []);

  return (
    <div>Déconnexion en cours...</div>
  );
}