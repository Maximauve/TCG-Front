"use client"

import Link from 'next/link';
import { useGetLatestCardsQuery } from '../services/card.service';
import { Card as CardType } from '../types/model/Card';
import { Booster } from './Booster';
import Card from './Card';

export default function UserPage({ onSelect }: { onSelect: (card: CardType) => void}) {

  const { data: cards } = useGetLatestCardsQuery()

  return (
    <div className="flex flex-col min-h-screen p-4">
      <h2 className="text-3xl text-center font-bold mt-4">Boosters</h2>
      <div className="flex justify-center mt-8 gap-5">
        <Link href="/open">
          <Booster image="/deck_placeholder.png" />
        </Link>
        <Link href="/open">
          <Booster image="/deck_placeholder.png" />
        </Link>
      </div>
      <h2 className="text-3xl text-center font-bold mt-8">Mes cartes</h2>
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {cards?.map((card) => (
          <Card key={crypto.randomUUID()} image={card.image} title={card.name} onClick={() => onSelect(card)}/>
        ))}
      </div>
    </div>
  );
} 