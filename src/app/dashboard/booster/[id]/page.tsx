"use client";

import { useParams } from "next/navigation";
import { useGetCollectionByIdQuery } from "@/src/services/collection.service";
import { useState, useRef } from "react";
import { useCreateCardMutation } from "@/src/services/card.service";
import { formatDateDMY } from "@/src/core/utils";
import BoosterHeader from "@/src/components/BoosterHeader";
import CardGrid from "@/src/components/CardGrid";
import BoosterActions from "@/src/components/BoosterActions";
import BoosterModal from "@/src/components/BoosterModal";
import CardForm from "@/src/components/CardForm";
import Navbar from "@/src/components/Navbar";

const rarityTable = {
  common:    [0.7, 0.65, 0.75, 0.6, 0.55, 0.8, 0.5],
  uncommon:  [0.3, 0.25, 0.35, 0.28],
  rare:      [0.1, 0.12, 0.08],
  epic:      [0.05, 0.04],
  mythic:    [0.01],
  special:   [0.005],
  promo:     [0.001],
  limited:   [0.0001],
};

function getRandomDropRate(rarity: keyof typeof rarityTable): number | '' {
  const arr = rarityTable[rarity] || [];
  if (arr.length === 0) return '';
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function BoosterDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: booster, isLoading, error, refetch } = useGetCollectionByIdQuery(id);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null) as React.RefObject<HTMLFormElement>;
  const [createCard] = useCreateCardMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const [cardForm, setCardForm] = useState({
    rarity: "",
    dropRate: "",
  });

  const handleAddCard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setUploading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("collectionId", id);
    const randomRarity = getRandomDropRate(cardForm.rarity as keyof typeof rarityTable);
    formData.set("rarity", cardForm.rarity);
    formData.set("dropRate", randomRarity.toString());
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

  const handleCardFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "rarity") {
      const randomDrop = getRandomDropRate(value as keyof typeof rarityTable);
      setCardForm(f => ({ ...f, rarity: value, dropRate: randomDrop.toString() }));
    } else {
      setCardForm(f => ({ ...f, [name]: value }));
    }
  };

  return (
    <>
    <Navbar />
    <div className="p-8 max-w-5xl mx-auto">
      {isLoading && (
        <div className="flex justify-center items-center h-64" role="status">
          <div className="loader" />
        </div>
      )}
      {error && <p className="text-red-500 text-center">Erreur lors du chargement</p>}
      {booster && (
        <>
          <BoosterHeader
            displayImage={booster.displayImage}
            name={booster.name}
            description={booster.description}
            releaseDate={booster.releaseDate}
            endDate={booster.endDate} />
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Cartes du booster</h2>
          <CardGrid cards={booster.cards || []} />
          <BoosterActions onAddCard={() => setModalOpen(true)} />
          <BoosterModal open={modalOpen} onClose={() => setModalOpen(false)}>
            <CardForm
              onSubmit={handleAddCard}
              loading={uploading}
              error={formError}
              formRef={formRef}
              cardForm={cardForm}
              onChange={handleCardFormChange} />
          </BoosterModal>
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
    </>
  );
} 