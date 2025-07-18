import Image from "next/image";
import { useRef, useState } from "react";

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

  const cardRef = useRef<HTMLDivElement>(null);
  const [isTilted, setIsTilted] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation angles (max 15 degrees)
    const rotateY = (mouseX / (rect.width / 2)) * 15;
    const rotateX = -(mouseY / (rect.height / 2)) * 15;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isSelected ? 1 : 1.05})`;
    
    // Show rainbow overlay when tilted and update its position (only for epic)
    if (rarity === "epic" || rarity === "mythic") {
      const isTilted = Math.abs(rotateX) > 2 || Math.abs(rotateY) > 2;
      setIsTilted(isTilted);
      // Update rainbow overlay transform
      const rainbowOverlay = cardRef.current.querySelector('.rainbow-overlay') as HTMLElement;
      if (rainbowOverlay) {
        const translateX = (rotateY / 15) * 20; // Move horizontally based on Y rotation
        const translateY = (rotateX / 15) * 20; // Move vertically based on X rotation
        rainbowOverlay.style.transform = `translate(${translateX}px, ${translateY}px)`;
      }
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(${isSelected ? 1 : 1.05})`;
    if (rarity === "epic" || rarity === "mythic") {
      setIsTilted(false);
      // Reset rainbow overlay position
      const rainbowOverlay = cardRef.current.querySelector('.rainbow-overlay') as HTMLElement;
      if (rainbowOverlay) {
        rainbowOverlay.style.transform = 'translate(0px, 0px)';
      }
    }
  };

  return (
      <div
      className={`${isSelected ? "w-64 h-fit" : "w-32 h-fit"} relative flex items-center justify-center rounded-xl shadow cursor-pointer transition-transform hover:scale-105 border-4 overflow-hidden ${borderClass} p-0`}
      onClick={onClick}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(${isSelected ? 1 : 1.05})`,
        transition: "none"
      }}
    >
      {showBadge && (
        <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-bl-lg rounded-tr-lg">
          x{quantity}
        </span>
      )}
      <img
        src={image ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${image}` : "file.svg"}
        alt={title || ""}
        width={250}
        height={450}
        className="object-cover w-full h-full rounded-lg"
        style={{ boxShadow: isSelected ? `0 0 24px 6px var(--tw-shadow-color)` : undefined }}
      />
      {["epic","mythic"].includes(rarity) && isSelected && (
        <>
          <div className={`pointer-events-none absolute left-1/2 top-1/2 w-[180%] h-[180%] -translate-x-1/2 -translate-y-1/2 rounded-full rainbow-overlay transition-opacity duration-300 ${isTilted ? 'opacity-90' : 'opacity-0'}`} />
        </>
      )}
    </div>
  );
}