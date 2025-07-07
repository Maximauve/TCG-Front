"use client";

import { useRouter } from "next/navigation";
import { useGetCollectionsQuery, useCreateCollectionMutation } from "@/src/services/collection.service";
import { useState, useRef } from "react";
import { Collection } from "@/src/types/model/Collection";
import { toast } from "react-toastify";
import UserMenu from "@/src/components/UserMenu";

export default function DashboardPage() {
  const { data: collections, isLoading, error } = useGetCollectionsQuery();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Partial<Collection>>({
    name: "",
    description: "",
    displayImage: "",
    boosterImage: "",
    releaseDate: "",
    endDate: "",
    special: false,
    isSpecial: false,
  });
  const [createCollection, { isLoading: isCreating }] = useCreateCollectionMutation();
  const router = useRouter();
  const [displayImageFile, setDisplayImageFile] = useState<File | null>(null);
  const [boosterImageFile, setBoosterImageFile] = useState<File | null>(null);
  const displayImagePreview = displayImageFile ? URL.createObjectURL(displayImageFile) : undefined;
  const boosterImagePreview = boosterImageFile ? URL.createObjectURL(boosterImageFile) : undefined;
  const displayImageInputRef = useRef<HTMLInputElement>(null);
  const boosterImageInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      if (name === "displayImage") setDisplayImageFile(files[0]);
      if (name === "boosterImage") setBoosterImageFile(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayImageFile || !boosterImageFile) {
      toast.error("Les deux images sont obligatoires");
      return;
    }
    const formData = new FormData();
    formData.append("name", form.name || "");
    formData.append("description", form.description || "");
    formData.append("displayImage", displayImageFile);
    formData.append("boosterImage", boosterImageFile);
    formData.append("releaseDate", form.releaseDate || "");
    formData.append("endDate", form.endDate || "");
    formData.append("isSpecial", String(!!form.isSpecial));
    try {
      await createCollection(formData).unwrap();
      toast.success("Booster créé avec succès !");
      setShowModal(false);
      setForm({
        name: "",
        description: "",
        displayImage: "",
        boosterImage: "",
        releaseDate: "",
        endDate: "",
        special: false,
        isSpecial: false,
      });
      setDisplayImageFile(null);
      setBoosterImageFile(null);
      if (displayImageInputRef.current) displayImageInputRef.current.value = "";
      if (boosterImageInputRef.current) boosterImageInputRef.current.value = "";
    } catch {
      toast.error("Erreur lors de la création du booster");
    }
  };

  

  return (
    <>
    <UserMenu />
    <div className="min-h-screen p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl px-7 py-3 text-lg font-semibold shadow hover:from-blue-700 hover:to-blue-900 transition"
        >
          + Créer un booster
        </button>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Catégories de boosters</h2>
      {isLoading && (
        <div className="flex justify-center items-center h-64" role="status">
          <div className="loader" />
        </div>
      )}
      {error && <p>Erreur lors du chargement</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {collections && collections.length > 0 ? (
          collections.map((col) => (
            <div
              key={col.id}
              className="bg-white rounded-2xl shadow-lg p-7 flex flex-col items-center border border-gray-200 cursor-pointer hover:shadow-xl transition"
              onClick={() => router.push(`/dashboard/booster/${col.id}`)}
            >
              <img
                src={col.displayImage ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${col.displayImage}` : "/window.svg"}
                alt={col.name}
                className="w-28 h-28 object-cover rounded-xl mb-4 bg-gray-100 shadow"
              />
              <div className="font-bold text-lg mb-2 text-center">{col.name}</div>
              <div className="text-gray-600 text-sm text-center mb-3 min-h-[40px]">{col.description}</div>
              <button
                className="mt-auto px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold text-base shadow hover:from-blue-700 hover:to-blue-900 transition"
                onClick={e => {
                  e.stopPropagation();
                  router.push(`/dashboard/booster/${col.id}`);
                }}
              >Voir les cartes</button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg py-12">
            Aucun booster disponible pour le moment.
          </div>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-9 w-full max-w-md shadow-2xl relative flex flex-col gap-4 overflow-y-auto max-h-[80vh] pr-2">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600 transition"
              aria-label="Fermer"
            >×</button>
            <h2 className="text-xl font-bold mb-2">Créer un booster</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label className="block text-sm font-medium mb-1" htmlFor="booster-name">Nom *</label>
              <input id="booster-name" name="name" placeholder="Nom" value={form.name} onChange={handleChange} required className={inputClass} />
              <label className="block text-sm font-medium mb-1" htmlFor="booster-description">Description *</label>
              <textarea id="booster-description" name="description" placeholder="Description" value={form.description} onChange={handleChange} required className={inputClass + ' min-h-[60px]'} />
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="booster-displayImage">Image d'affichage *</label>
                <input
                  ref={displayImageInputRef}
                  id="booster-displayImage"
                  type="file"
                  name="displayImage"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {displayImagePreview && (
                  <img src={displayImagePreview} alt="Prévisualisation" className="mt-2 rounded-lg w-32 h-32 object-cover border" />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="booster-boosterImage">Image du booster *</label>
                <input
                  ref={boosterImageInputRef}
                  id="booster-boosterImage"
                  type="file"
                  name="boosterImage"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {boosterImagePreview && (
                  <img src={boosterImagePreview} alt="Prévisualisation" className="mt-2 rounded-lg w-32 h-32 object-cover border" />
                )}
              </div>
              <label className="block text-sm font-medium mb-1" htmlFor="booster-releaseDate">Date de sortie *</label>
              <input id="booster-releaseDate" name="releaseDate" type="date" placeholder="Date de sortie" value={form.releaseDate} onChange={handleChange} required className={inputClass} />
              <label className="block text-sm font-medium mb-1" htmlFor="booster-endDate">Date de fin</label>
              <input id="booster-endDate" name="endDate" type="date" placeholder="Date de fin" value={form.endDate} onChange={handleChange} className={inputClass} />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="isSpecial" checked={!!form.isSpecial} onChange={handleChange} className="accent-blue-600" /> Is Special
              </label>
              <button
                type="submit"
                disabled={isCreating}
                className="mt-2 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold text-base shadow hover:from-blue-700 hover:to-blue-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >{isCreating ? 'Création...' : 'Créer'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
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
    `}</style>
    </>
  );
}

const inputClass = "border border-gray-200 rounded-lg px-4 py-2 text-base outline-none bg-gray-50 focus:border-blue-400 transition";
