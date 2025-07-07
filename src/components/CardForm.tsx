import React from "react";

interface CardFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  error: string | null;
  formRef: React.RefObject<HTMLFormElement>;
  cardForm: {
    rarity: string;
    dropRate: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function CardForm({ onSubmit, loading, error, formRef, cardForm, onChange }: CardFormProps) {
  return (
    <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="font-medium text-gray-700">Nom de la carte *</label>
        <input name="name" id="name" placeholder="Nom de la carte" required className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-200" onChange={onChange} />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="font-medium text-gray-700">Description *</label>
        <textarea name="description" id="description" placeholder="Description" required className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-200" onChange={onChange} />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="image" className="font-medium text-gray-700">Image *</label>
        <input type="file" name="image" id="image" accept="image/*" required className="border border-gray-300 rounded px-3 py-2" onChange={onChange} />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="artistTag" className="font-medium text-gray-700">Artiste (tag) *</label>
        <input name="artistTag" id="artistTag" placeholder="Artiste" required className="border border-gray-300 rounded px-3 py-2" onChange={onChange} />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="rarity" className="font-medium text-gray-700">Rareté *</label>
        <select name="rarity" id="rarity" required className="border border-gray-300 rounded px-3 py-2" value={cardForm.rarity} onChange={onChange}>
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
        <label htmlFor="dropRate" className="font-medium text-gray-700">Drop Rate (%) *</label>
        <input type="number" step="0.0001" min="0" max="100" name="dropRate" id="dropRate" placeholder="Ex: 0.5" required className="border border-gray-300 rounded px-3 py-2" value={cardForm.dropRate} readOnly />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="releaseDate" className="font-medium text-gray-700">Date de sortie *</label>
        <input type="date" name="releaseDate" id="releaseDate" required className="border border-gray-300 rounded px-3 py-2" onChange={onChange} />
      </div>
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
      <button type="submit" disabled={loading} className="mt-2 px-5 py-2 rounded-lg border-none bg-blue-600 text-white font-medium text-lg hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed">
        {loading ? "Ajout en cours..." : "Ajouter"}
      </button>
    </form>
  );
} 