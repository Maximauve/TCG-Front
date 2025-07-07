"use client"

import { useState, useRef, useEffect, useMemo } from 'react';
import { Card as CardType } from '@/src/types/model/Card';
import { useGetCardsQuery } from '@/src/services/card.service';
import UserMenu from '@/src/components/UserMenu';
import CardsList from '../../components/CardsList';
import CardModal from '../../components/CardModal';
import Navbar from '@/src/components/Navbar';

export default function CardsPage() {
  const { data: cards } = useGetCardsQuery();
  const [selected, setSelected] = useState<CardType | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Aggregate duplicates
  const uniqueCards = useMemo(() => {
    if (!cards) return [];
    const map = new Map<string, { card: CardType; quantity: number }>();
    cards.forEach((card) => {
      const key = card.name; // group by card name (duplicates share same name)
      if (map.has(key)) {
        map.get(key)!.quantity += 1;
      } else {
        map.set(key, { card, quantity: 1 });
      }
    });
    return Array.from(map.values()).map(({ card, quantity }) => ({ ...card, quantity }));
  }, [cards]);

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
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-8">Mes cartes</h1>
        <CardsList cards={uniqueCards} onSelect={setSelected} />
        {selected && (
          <CardModal selected={selected} onClose={() => setSelected(null)} />
        )}
      </div>
    </>
  );
}
