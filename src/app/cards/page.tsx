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
  const [sortOption, setSortOption] = useState<string>("rarity_desc");
  const modalRef = useRef<HTMLDivElement>(null);

  // Aggregate duplicates
  const processedCards = useMemo(() => {
    if (!cards) return [];
    // Step 1: group duplicates by name
    const map = new Map<string, { card: CardType; quantity: number }>();
    cards.forEach((card) => {
      const key = card.name;
      if (map.has(key)) {
        map.get(key)!.quantity += 1;
      } else {
        map.set(key, { card, quantity: 1 });
      }
    });
    const unique = Array.from(map.values()).map(({ card, quantity }) => ({ ...card, quantity }));

    // Step 2: sort according to selected option
    const rarityRank: Record<string, number> = {
      common: 1,
      uncommon: 2,
      rare: 3,
      epic: 4,
      mythic: 5,
      special: 6,
      promo: 7,
      limited: 8,
    };

    const sorted = [...unique].sort((a, b) => {
      switch (sortOption) {
        case "rarity_asc":
          return (rarityRank[a.rarity] ?? 0) - (rarityRank[b.rarity] ?? 0);
        case "rarity_desc":
          return (rarityRank[b.rarity] ?? 0) - (rarityRank[a.rarity] ?? 0);
        case "name_asc":
          return a.name.localeCompare(b.name);
        case "name_desc":
          return b.name.localeCompare(a.name);
        case "quantity_asc":
          return (a.quantity ?? 0) - (b.quantity ?? 0);
        case "quantity_desc":
          return (b.quantity ?? 0) - (a.quantity ?? 0);
        default:
          return 0;
      }
    });

    return sorted;
  }, [cards, sortOption]);

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
        <h1 className="text-4xl font-bold text-center mb-4">Mes cartes</h1>
        {/* Sorting controls */}
        <div className="flex justify-center mb-4">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="rarity_desc">Rareté (Rare → Commun)</option>
            <option value="rarity_asc">Rareté (Commun → Rare)</option>
            <option value="name_asc">Nom (A → Z)</option>
            <option value="name_desc">Nom (Z → A)</option>
            <option value="quantity_desc">Quantité (plus → moins)</option>
            <option value="quantity_asc">Quantité (moins → plus)</option>
          </select>
        </div>
        <CardsList cards={processedCards} onSelect={setSelected} />
        {selected && (
          <CardModal selected={selected} onClose={() => setSelected(null)} />
        )}
      </div>
    </>
  );
}
