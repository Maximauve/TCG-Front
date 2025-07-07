"use client"

import { useState, useRef, useEffect } from 'react';
import { Card as CardType } from '@/src/types/model/Card';
import { useGetCardsQuery } from '@/src/services/card.service';
import UserMenu from '@/src/components/UserMenu';
import CardsList from '../../components/CardsList';
import CardModal from '../../components/CardModal';

export default function CardsPage() {
  const { data: cards } = useGetCardsQuery();
  const [selected, setSelected] = useState<CardType | null>(null);
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

  return (
    <>
      <UserMenu />
      <div className="flex flex-col min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-8">Mes cartes</h1>
        <CardsList cards={cards || []} onSelect={setSelected} />
        {selected && (
          <CardModal selected={selected} onClose={() => setSelected(null)} />
        )}
      </div>
    </>
  );
}
