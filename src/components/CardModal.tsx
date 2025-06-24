"use client";
import { useRef, useEffect } from "react";
import Card from "@/src/components/Card";
import { Card as CardType } from "@/src/types/model/Card";

export default function CardModal({ selected, onClose }: { selected: CardType; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  if (!selected) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div ref={modalRef} className="w-4/5 flex">
        <div className="flex-shrink-0 flex items-center justify-center rounded-lg mb-6 md:mb-0 md:mr-10">
          <Card image={selected.image} title={selected.name} isSelected />
        </div>
        <div className="bg-gray-200 flex-1 flex flex-col md:pl-6 border-t rounded-lg md:border-t-0 md:border-l border-gray-200 pt-6">
          <h2 className="text-2xl font-bold mb-2">{selected.name}</h2>
          <p className="text-black mb-4">{selected.description}</p>
          <div className="text-sm text-black">
            <div><b>Artiste :</b> {selected.artist}</div>
            <div><b>Rareté :</b> {selected.rarity}</div>
            <div><b>Obtenu le </b> {new Date(selected.obtained_at).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
} 