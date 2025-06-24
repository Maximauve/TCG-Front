"use client";
import Card from "@/src/components/Card";
import { Card as CardType } from "@/src/types/model/Card";

export default function CardsList({ cards, onSelect }: { cards: CardType[]; onSelect: (card: CardType) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-4">
      {cards?.map((card) => (
        <Card
          key={crypto.randomUUID()}
          image={card.image}
          title={card.name}
          description={card.description}
          onClick={() => onSelect(card)}
        />
      ))}
    </div>
  );
} 