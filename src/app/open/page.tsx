"use client";

import { useState } from "react";
import { useGetCollectionsQuery } from "@/src/services/collection.service";
import { useOpenBoosterMutation, useGetBoosterStatusQuery } from "@/src/services/booster.service";
import Loader from "@/src/components/Loader";
import { Booster } from "@/src/components/Booster";
import { showToast } from "@/src/core/toast";
import { Collection } from "@/src/types/model/Collection";
import Card from "@/src/components/Card";
import { Card as CardType } from "@/src/types/model/Card";
import Navbar from "@/src/components/Navbar";
import { useRouter } from "next/navigation";

export default function OpenPage() {
  const { data: collections, isLoading, isError } = useGetCollectionsQuery();
  const [selected, setSelected] = useState<Collection | null>(null);
  const [openBooster, { isLoading: isOpening }] = useOpenBoosterMutation();
  const [openedCards, setOpenedCards] = useState<CardType[] | null>(null);
  const { data: boosterStatus, isLoading: isStatusLoading, isError: isStatusError, refetch: refetchBoosterStatus } = useGetBoosterStatusQuery();
  const router = useRouter();

  const handleOpenBooster = async () => {
    if (!selected) return;
    if (boosterStatus && !boosterStatus.can_open_booster) {
      showToast.error("Vous ne pouvez pas ouvrir de booster pour le moment.");
      await refetchBoosterStatus();
      return;
    }
    try {
      const { cards } = await openBooster(selected.id).unwrap();
      setOpenedCards(cards);
      showToast.success("Booster ouvert avec succès !");
      await refetchBoosterStatus();
      await refetchBoosterStatus();
    } catch (e: any) {
      showToast.error(e?.data?.message || "Erreur lors de l'ouverture du booster");
    }
  };

  const handleBack = () => {
    setOpenedCards(null);
    setSelected(null);
  };

  if (isLoading || isStatusLoading || isStatusLoading) return <Loader />;
  if (isError || isStatusError || isStatusError) return <div className="text-center mt-10 text-red-500">Erreur lors du chargement des collections.</div>;
  if (boosterStatus && !boosterStatus.can_open_booster) {
    return (
        <>
          <Navbar />
          <div className="flex flex-col items-center min-h-screen justify-center p-6">
          <div className="bg-white rounded-xl shadow-lg p-8 mt-10 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4 text-blue-700">Ouverture de booster indisponible</h1>
            <p className="text-lg text-gray-700 mb-2">Vous ne pouvez pas ouvrir de booster pour le moment.</p>
            {boosterStatus.next_booster_at && (
              <p className="text-gray-500">Prochain booster disponible le : <b>{new Date(boosterStatus.next_booster_at).toLocaleString()}</b></p>
            )}
          </div>
          </div>
        </>
    );
  }
  if (openedCards) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center min-h-screen p-6 bg-gradient-to-b from-blue-100 to-white">
          <h1 className="text-4xl font-bold mb-8 text-blue-700">Cartes obtenues !</h1>
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            {openedCards.map((card, idx) => (
              <div
                key={card.id}
                style={{ animationDelay: `${idx * 0.15}s` }}
                className="animate-card-reveal"
              >
                <Card image={card.image} title={card.name} rarity={card.rarity} isSelected />
              </div>
            ))}
          </div>
          <button
            className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={handleBack}
          >
            Retour aux collections
          </button>
          <style jsx global>{`
            @keyframes card-reveal {
              0% { opacity: 0; transform: translateY(40px) scale(0.8) rotate(-5deg); }
              60% { opacity: 1; transform: translateY(-10px) scale(1.05) rotate(2deg); }
              100% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
            }
            .animate-card-reveal {
              animation: card-reveal 0.6s cubic-bezier(0.68,-0.55,0.27,1.55) both;
            }
          `}</style>
        </div>
      </>
    );
  }
  if (boosterStatus && !boosterStatus.can_open_booster) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center min-h-screen justify-center p-6">
          <div className="bg-white rounded-xl shadow-lg p-8 mt-10 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4 text-blue-700">Ouverture de booster indisponible</h1>
            <p className="text-lg text-gray-700 mb-2">Vous ne pouvez pas ouvrir de booster pour le moment.</p>
            {boosterStatus.next_booster_at && (
              <p className="text-gray-500">Prochain booster disponible le : <b>{new Date(boosterStatus.next_booster_at).toLocaleString()}</b></p>
            )}
            <button
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => router.push("/")}
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </>
    );
  }

  // Vue de sélection de collection
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen p-6">
        <h1 className="text-4xl font-bold mb-8">Ouvrir un booster</h1>
        <div className="flex flex-wrap justify-center gap-8 mb-10">
          {collections?.map((collection) => (
            <div
              key={collection.id}
              className={`flex flex-col items-center cursor-pointer border rounded-lg p-4 transition-transform hover:scale-105 ${selected?.id === collection.id ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
              onClick={() => setSelected(collection)}
            >
              <Booster image={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${collection.displayImage}`} />
              <div className="mt-4 text-lg font-semibold text-center">{collection.name}</div>
            </div>
          ))}
        </div>
        {selected && (
          <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-2">{selected.name}</h2>
            <p className="mb-4 text-center text-gray-700">{selected.description}</p>
            {boosterStatus && !boosterStatus.can_open_booster ? (
              <div className="text-red-500 font-semibold mt-4">
                Vous ne pouvez pas ouvrir de booster pour le moment.
                {boosterStatus.next_booster_at && (
                  <div className="text-gray-500 text-sm">
                    Prochain booster disponible le : <b>{new Date(boosterStatus.next_booster_at).toLocaleString()}</b>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-60"
                onClick={handleOpenBooster}
                disabled={isOpening}
              >
                {isOpening ? "Ouverture..." : "Ouvrir un booster"}
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
