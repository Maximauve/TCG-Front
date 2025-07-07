"use client";

import { useRouter } from "next/navigation";
import { useCreateCollectionMutation, useGetMyCollectionsQuery } from "@/src/services/collection.service";
import { useState, useRef } from "react";
import { Collection } from "@/src/types/model/Collection";
import { toast } from "react-toastify";
import Navbar from "@/src/components/Navbar";
import BoosterGrid from "@/src/components/BoosterGrid";
import BoosterForm from "@/src/components/BoosterForm";
import BoosterModal from "@/src/components/BoosterModal";

export default function DashboardPage() {
  const { data: collections, isLoading, error } = useGetMyCollectionsQuery();
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
  const displayImageInputRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const boosterImageInputRef = useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;

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
      <Navbar />
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
        <BoosterGrid
          boosters={collections || []}
          onBoosterClick={id => router.push(`/dashboard/booster/${id}`)}
          onVoirCartes={id => router.push(`/dashboard/booster/${id}`)}
        />
        <BoosterModal open={showModal} onClose={() => setShowModal(false)}>
          <h2 className="text-xl font-bold mb-2">Créer un booster</h2>
          <BoosterForm
            onSubmit={handleSubmit}
            loading={isCreating}
            form={form}
            onChange={handleChange}
            onFileChange={handleFileChange}
            displayImagePreview={displayImagePreview}
            boosterImagePreview={boosterImagePreview}
            displayImageInputRef={displayImageInputRef}
            boosterImageInputRef={boosterImageInputRef}
          />
        </BoosterModal>
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