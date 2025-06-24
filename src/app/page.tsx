"use client"

import { useSession } from 'next-auth/react';
import HomePage from '../components/HomePage';
import UserPage from '../components/UserPage';
import UserMenu from '../components/UserMenu';
import CardModal from '../components/CardModal';
import { Card } from "@/src/types/model/Card"
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const [selected, setSelected] = useState<Card | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selected) return;
    function handleClick(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSelected(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [selected]);

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  if (!session) {
    return <HomePage />;
  }

  return (
    <>
      <UserMenu />
      <UserPage onSelect={setSelected} />
      {selected && (
        <CardModal selected={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
