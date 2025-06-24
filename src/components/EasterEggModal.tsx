import Image from 'next/image';
import { useState } from 'react';

export default function EasterEggModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="fixed top-0 right-0 w-[10px] h-[10px] z-[100] cursor-pointer opacity-0"
        onClick={() => setOpen(true)}
        aria-label="Easter Egg"
      />
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div
            className="bg-white rounded-lg p-6 shadow-lg relative flex flex-col items-center animate-easter-pop"
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none cursor-pointer"
              onClick={() => setOpen(false)}
              aria-label="Fermer"
            >
              &times;
            </button>
            <Image
              src="/easter_egg.png"
              alt="Easter Egg"
              width={400}
              height={300}
              className="object-contain mb-4 animate-easter-wiggle"
            />
          </div>
        </div>
      )}
      <style jsx global>{`
        @keyframes easter-pop {
          0% { transform: scale(0.5); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          80% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        .animate-easter-pop {
          animation: easter-pop 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
      `}</style>
    </>
  );
} 