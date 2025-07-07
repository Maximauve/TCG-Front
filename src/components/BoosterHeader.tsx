import { formatDateDMY } from "@/src/core/utils";

interface BoosterHeaderProps {
  displayImage?: string;
  name: string;
  description: string;
  releaseDate: string;
  endDate?: string;
}

export default function BoosterHeader({ displayImage, name, description, releaseDate, endDate }: BoosterHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 mb-10 bg-white/80 rounded-2xl shadow-lg p-8">
      <img
        src={displayImage ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${displayImage}` : "/window.svg"}
        alt={name}
        className="w-40 h-40 object-cover rounded-2xl bg-[#f3f3f3] shadow-md border"
      />
      <div className="flex-1">
        <h1 className="text-4xl font-extrabold mb-2 text-blue-800">{name}</h1>
        <p className="text-gray-700 text-lg mb-2">{description}</p>
        <div className="text-sm text-gray-500">
          <b>Sortie :</b> {formatDateDMY(releaseDate)} <b>Fin :</b> {endDate ? formatDateDMY(endDate) : '—'}
        </div>
      </div>
    </div>
  );
} 