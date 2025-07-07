const rarityStyles: Record<string, string> = {
  common: "border-gray-300",
  uncommon: "border-green-500 shadow-green-300/40",
  rare: "border-blue-500 shadow-blue-400/40",
  epic: "border-purple-600 shadow-purple-400/60 animate-epic-glow",
  mythic: "border-orange-500 shadow-orange-400/70 animate-mythic-glow",
  special: "border-pink-500 shadow-pink-400/70 animate-pulse",
  promo: "border-yellow-400 shadow-yellow-200/80 animate-pulse",
  limited: "border-black shadow-black/60 animate-pulse",
};

interface CardProps {
  image: string;
  title?: string;
  description?: string;
  rarity?: string;
  onClick?: () => void;
  isSelected?: boolean;
  quantity?: number;
}

export default function Card({ image, title, description, rarity = "common", onClick, isSelected = false, quantity }: CardProps) {
  const borderClass = rarityStyles[rarity] || rarityStyles["common"];
  const showBadge = (quantity ?? 0) > 1;

  return (
    <div
      className={`${isSelected ? "w-64 h-90" : "w-32 h-48"} relative flex items-center justify-center rounded-lg shadow cursor-pointer transition-transform hover:scale-105 border-4 ${borderClass}`}
      style={{ boxShadow: isSelected ? `0 0 24px 6px var(--tw-shadow-color)` : undefined }}
      onClick={onClick}
    >
      {showBadge && (
        <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-bl-lg">
          x{quantity}
        </span>
      )}
      <img
        src={image ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${image}` : "file.svg"}
        alt={title || ""}
        width={250}
        height={450}
        className="object-contain w-full h-full rounded-lg"
      />
    </div>
  );
}