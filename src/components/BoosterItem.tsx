interface BoosterItemProps {
  id: string | number;
  name: string;
  description: string;
  displayImage?: string;
  onClick?: () => void;
  onVoirCartes?: () => void;
}

export default function BoosterItem({ id, name, description, displayImage, onClick, onVoirCartes }: BoosterItemProps) {
  return (
    <div
      className="bg-white rounded-2xl shadow-lg p-7 flex flex-col items-center border border-gray-200 cursor-pointer hover:shadow-xl transition"
      onClick={onClick}
    >
      <img
        src={displayImage ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${displayImage}` : "/window.svg"}
        alt={name}
        className="w-28 h-28 object-cover rounded-xl mb-4 bg-gray-100 shadow"
      />
      <div className="font-bold text-lg mb-2 text-center">{name}</div>
      <div className="text-gray-600 text-sm text-center mb-3 min-h-[40px]">{description}</div>
      <button
        className="mt-auto px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold text-base shadow hover:from-blue-700 hover:to-blue-900 transition"
        onClick={e => {
          e.stopPropagation();
          onVoirCartes && onVoirCartes();
        }}
      >Voir les cartes</button>
    </div>
  );
} 