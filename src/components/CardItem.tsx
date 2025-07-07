interface CardItemProps {
  id: string | number;
  name: string;
  image?: string;
  rarity: string;
  artist?: string;
}

export default function CardItem({ id, name, image, rarity, artist }: CardItemProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:scale-105 transition-transform border border-gray-100">
      <img src={image ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${image}` : "/window.svg"} alt={name} className="w-24 h-32 object-cover rounded-lg mb-2 bg-[#f3f3f3] border" />
      <div className="font-semibold text-base text-blue-900">{name}</div>
      <div className="text-gray-500 text-sm">{rarity}</div>
      {artist && <div className="text-xs text-gray-600 mt-1">{artist}</div>}
    </div>
  );
} 