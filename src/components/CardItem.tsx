interface CardItemProps {
  id: string | number;
  name: string;
  image?: string;
  rarity: string;
  artist?: string;
  onDelete?: () => void;
}

const rarityTags = {
  common:   { label: "Commun",      color: "bg-gray-200 text-gray-800" },
  uncommon: { label: "Peu commune",color: "bg-green-100 text-green-700" },
  rare:     { label: "Rare",        color: "bg-blue-100 text-blue-700" },
  epic:     { label: "Épique",      color: "bg-purple-100 text-purple-700" },
  mythic:   { label: "Mythique",    color: "bg-orange-100 text-orange-700" },
  special:  { label: "Spéciale",    color: "bg-pink-100 text-pink-700" },
  promo:    { label: "Promo",       color: "bg-yellow-100 text-yellow-700" },
  limited:  { label: "Limitée",     color: "bg-black text-white" },
};

export default function CardItem({ id, name, image, rarity, artist, onDelete }: CardItemProps) {
  const tag = rarityTags[rarity as keyof typeof rarityTags] || { label: rarity, color: "" };
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:scale-105 transition-transform border border-gray-100 relative">
      {onDelete && (
        <button
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl font-bold focus:outline-none"
          title="Supprimer la carte"
          onClick={e => {
            e.stopPropagation();
            onDelete();
          }}
        >
          ×
        </button>
      )}
      <img src={image ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${image}` : "/window.svg"} alt={name} className="w-24 h-32 object-cover rounded-lg mb-2 bg-[#f3f3f3] border" />
      <div className="font-semibold text-base text-blue-900">{name}</div>
      <span className={`px-2 py-1 rounded text-xs font-bold uppercase mt-1 mb-1 ${tag.color}`}>{tag.label}</span>
      {artist && <div className="text-xs text-gray-600 mt-1">{artist}</div>}
    </div>
  );
} 