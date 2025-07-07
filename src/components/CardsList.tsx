"use client";
import Card from "@/src/components/Card";
import { Card as CardType } from "@/src/types/model/Card";

interface CardWithQuantity extends CardType {
  quantity?: number;
}

export default function CardsList({ cards, onSelect }: { cards: CardWithQuantity[]; onSelect: (card: CardWithQuantity) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-4">
      {cards?.map((card) => (
        <Card
          key={crypto.randomUUID()}
          image={card.image}
          title={card.name}
          description={card.description}
          rarity={card.rarity}
          quantity={card.quantity}
          onClick={() => onSelect(card)}
        />
      ))}
    </div>
  );
} 