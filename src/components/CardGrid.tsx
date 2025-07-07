import CardItem from "./CardItem";

interface Card {
  id: string | number;
  name: string;
  image?: string;
  rarity: string;
  artist?: string;
}

interface CardGridProps {
  cards: Card[];
}

export default function CardGrid({ cards }: CardGridProps) {
  if (!cards || cards.length === 0) {
    return <p className="col-span-full text-center text-gray-500">Aucune carte dans ce booster.</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
      {cards.map(card => (
        <CardItem key={card.id} {...card} />
      ))}
    </div>
  );
} 