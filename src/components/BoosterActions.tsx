interface BoosterActionsProps {
  onAddCard: () => void;
}

export default function BoosterActions({ onAddCard }: BoosterActionsProps) {
  return (
    <div className="mb-8">
      <button
        onClick={onAddCard}
        className="px-6 py-2 rounded-lg bg-blue-700 text-white font-semibold text-lg shadow hover:bg-blue-800 transition"
      >
        Ajouter une carte
      </button>
    </div>
  );
} 