import React from "react";

interface BoosterModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BoosterModal({ open, onClose, children }: BoosterModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg p-8 relative w-full max-w-lg animate-easter-pop">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none cursor-pointer"
          onClick={onClose}
          aria-label="Fermer"
        >
          &times;
        </button>
        <h3 className="text-xl font-medium mb-4 text-blue-700">Ajouter une carte</h3>
        {children}
      </div>
    </div>
  );
} 