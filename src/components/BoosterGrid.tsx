import BoosterItem from "./BoosterItem";

interface Booster {
  id: string | number;
  name: string;
  description: string;
  displayImage?: string;
}

interface BoosterGridProps {
  boosters: Booster[];
  onBoosterClick?: (id: string | number) => void;
  onVoirCartes?: (id: string | number) => void;
}

export default function BoosterGrid({ boosters, onBoosterClick, onVoirCartes }: BoosterGridProps) {
  if (!boosters || boosters.length === 0) {
    return <div className="col-span-full text-center text-gray-500 text-lg py-12">Aucun booster disponible pour le moment.</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {boosters.map(booster => (
        <BoosterItem
          key={booster.id}
          {...booster}
          onClick={() => onBoosterClick && onBoosterClick(booster.id)}
          onVoirCartes={() => onVoirCartes && onVoirCartes(booster.id)}
        />
      ))}
    </div>
  );
} 