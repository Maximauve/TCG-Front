"use client";

import { useParams } from "next/navigation";
import { useGetCollectionByIdQuery } from "@/src/services/collection.service";
import { useState, useRef } from "react";
import { useCreateCardMutation } from "@/src/services/card.service";
import { formatDateDMY } from "@/src/core/utils";

export default function BoosterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: booster, isLoading, error, refetch } = useGetCollectionByIdQuery(id);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [createCard] = useCreateCardMutation();
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddCard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setUploading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("collectionId", id);
    try {
      await createCard(formData).unwrap();
      form.reset();
      refetch();
      setModalOpen(false);
    } catch (err: any) {
      setFormError(err.message || "Erreur inconnue");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {isLoading && (
        <div className="flex justify-center items-center h-64" role="status">
          <div className="loader" />
        </div>
      )}
      {error && <p className="text-red-500 text-center">Erreur lors du chargement</p>}
      {booster && (
        <>
          <div className="flex flex-col md:flex-row items-center gap-8 mb-10 bg-white/80 rounded-2xl shadow-lg p-8">
            <img
              src={booster.displayImage ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${booster.displayImage}` : "/window.svg"}
              alt={booster.name}
              className="w-40 h-40 object-cover rounded-2xl bg-[#f3f3f3] shadow-md border"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-extrabold mb-2 text-blue-800">{booster.name}</h1>
              <p className="text-gray-700 text-lg mb-2">{booster.description}</p>
              <div className="text-sm text-gray-500">
                <b>Sortie :</b> {formatDateDMY(booster.releaseDate)} <b>Fin :</b> {booster.endDate ? formatDateDMY(booster.endDate) : '—'}
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Cartes du booster</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
            {booster.cards && booster.cards.length > 0 ? booster.cards.map(card => (
              <div key={card.id} className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:scale-105 transition-transform border border-gray-100">
                <img src={card.image ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${card.image}` : "/window.svg"} alt={card.name} className="w-24 h-32 object-cover rounded-lg mb-2 bg-[#f3f3f3] border" />
                <div className="font-semibold text-base text-blue-900">{card.name}</div>
                <div className="text-gray-500 text-sm">{card.rarity}</div>
                <div className="text-xs text-gray-600 mt-1">{card.artist}</div>
              </div>
            )) : <p className="col-span-full text-center text-gray-500">Aucune carte dans ce booster.</p>}
          </div>
          <div className="mb-8">
            <button
              onClick={() => setModalOpen(true)}
              className="px-6 py-2 rounded-lg bg-blue-700 text-white font-semibold text-lg shadow hover:bg-blue-800 transition"
            >
              Ajouter une carte
            </button>
          </div>
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="bg-white rounded-xl shadow-lg p-8 relative w-full max-w-lg animate-easter-pop">
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none cursor-pointer"
                  onClick={() => setModalOpen(false)}
                  aria-label="Fermer"
                >
                  &times;
                </button>
                <h3 className="text-xl font-medium mb-4 text-blue-700">Ajouter une carte</h3>
                <form ref={formRef} onSubmit={handleAddCard} className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="font-medium text-gray-700">Nom de la carte *</label>
                    <input name="name" id="name" placeholder="Nom de la carte" required className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-200" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="description" className="font-medium text-gray-700">Description *</label>
                    <textarea name="description" id="description" placeholder="Description" required className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-200" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="image" className="font-medium text-gray-700">Image *</label>
                    <input type="file" name="image" id="image" accept="image/*" required className="border border-gray-300 rounded px-3 py-2" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="artistTag" className="font-medium text-gray-700">Artiste (tag) *</label>
                    <input name="artistTag" id="artistTag" placeholder="Artiste" required className="border border-gray-300 rounded px-3 py-2" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="rarity" className="font-medium text-gray-700">Rareté *</label>
                    <select name="rarity" id="rarity" required className="border border-gray-300 rounded px-3 py-2">
                      <option value="">Sélectionner...</option>
                      <option value="common">Common</option>
                      <option value="uncommon">Uncommon</option>
                      <option value="rare">Rare</option>
                      <option value="epic">Epic</option>
                      <option value="mythic">Mythic</option>
                      <option value="special">Special</option>
                      <option value="promo">Promo</option>
                      <option value="limited">Limited</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="releaseDate" className="font-medium text-gray-700">Date de sortie *</label>
                    <input type="date" name="releaseDate" id="releaseDate" required className="border border-gray-300 rounded px-3 py-2" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="dropRate" className="font-medium text-gray-700">Drop Rate (%) *</label>
                    <input type="number" step="0.01" min="0" max="100" name="dropRate" id="dropRate" placeholder="Ex: 5.5" required className="border border-gray-300 rounded px-3 py-2" />
                  </div>
                  {formError && <div className="text-red-500 text-sm mt-1">{formError}</div>}
                  <button type="submit" disabled={uploading} className="mt-2 px-5 py-2 rounded-lg border-none bg-blue-600 text-white font-medium text-lg hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed">
                    {uploading ? "Ajout en cours..." : "Ajouter"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </>
      )}
      <style jsx>{`
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
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
    </div>
  );
} 