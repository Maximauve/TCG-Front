import Image from "next/image";

const rarityStyles: Record<string, string> = {
  common: "border-gray-300",
  uncommon: "border-green-500 shadow-green-300/40",
  rare: "border-blue-500 shadow-blue-400/40",
  epic: "border-purple-600 shadow-purple-400/60",
  mythic: "border-orange-500 shadow-orange-400/70",
  special: "border-pink-500 shadow-pink-400/70 animate-pulse",
  promo: "border-yellow-400 shadow-yellow-200/80 animate-pulse",
  limited: "border-black shadow-black/60 animate-pulse",
};

export default function Card({ image, title, description, rarity = "common", onClick, isSelected = false }: { image: string, title?: string, description?: string, rarity?: string, onClick?: () => void, isSelected?: boolean }) {
  const borderClass = rarityStyles[rarity] || rarityStyles["common"];
  return (
    <div
      className={`${isSelected ? "w-64 h-90" : "w-32 h-48"} flex items-center justify-center rounded-lg shadow cursor-pointer transition-transform hover:scale-105 border-4 ${borderClass}`}
      style={{ boxShadow: isSelected ? `0 0 24px 6px var(--tw-shadow-color)` : undefined }}
      onClick={onClick}
    >
      <Image
        src={image ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${image}` : `${process.env.NEXT_PUBLIC_API_URL}/images/CARD_PLACEHOLDER.png}`}
        alt={title || ""}
        width={250}
        height={450}
        className="object-contain w-full h-full rounded-lg"
      />
    </div>
  );
}