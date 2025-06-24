import Image from "next/image";

export default function Card({ image, title, onClick, isSelected = false }: { image: string, title?: string, description?: string, onClick?: () => void, isSelected?: boolean }) {
  return (
    <div
      className={`${isSelected ? "w-64 h-90" : "w-32 h-48"} flex items-center justify-center rounded-lg shadow cursor-pointer transition-transform hover:scale-105`}
      onClick={onClick}
    >
      <Image
        src={image ? `${process.env.NEXT_PUBLIC_API_URL}/${image}` : `${process.env.NEXT_PUBLIC_API_URL}/images/CARD_PLACEHOLDER.png}`}
        alt={title || ""}
        width={250}
        height={450}
        className="object-contain w-full h-full rounded-lg"
      />
    </div>
  );
}