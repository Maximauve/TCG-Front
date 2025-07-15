import React from "react";

interface BoosterFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  error?: string | null;
  form: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  displayImagePreview?: string;
  boosterImagePreview?: string;
  displayImageInputRef: React.RefObject<HTMLInputElement>;
  boosterImageInputRef: React.RefObject<HTMLInputElement>;
}

export default function BoosterForm({ onSubmit, loading, error, form, onChange, onFileChange, displayImagePreview, boosterImagePreview, displayImageInputRef, boosterImageInputRef }: BoosterFormProps) {
  const inputClass = "border border-gray-200 rounded-lg px-4 py-2 text-base outline-none bg-gray-50 focus:border-blue-400 transition";
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <label className="block text-sm font-medium mb-1" htmlFor="booster-name">Nom *</label>
      <input id="booster-name" name="name" placeholder="Nom" value={form.name} onChange={onChange} required className={inputClass} />
      <label className="block text-sm font-medium mb-1" htmlFor="booster-description">Description *</label>
      <textarea id="booster-description" name="description" placeholder="Description" value={form.description} onChange={onChange} required className={inputClass + ' min-h-[60px]'} />
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="booster-displayImage">Image d'affichage *</label>
        <input
          ref={displayImageInputRef}
          id="booster-displayImage"
          type="file"
          name="displayImage"
          accept="image/*"
          onChange={onFileChange}
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
          onChange={onFileChange}
          required
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {boosterImagePreview && (
          <img src={boosterImagePreview} alt="Prévisualisation" className="mt-2 rounded-lg w-32 h-32 object-cover border" />
        )}
      </div>
      <label className="block text-sm font-medium mb-1" htmlFor="booster-releaseDate">Date de sortie *</label>
      <input id="booster-releaseDate" name="releaseDate" type="date" placeholder="Date de sortie" value={form.releaseDate} onChange={onChange} required className={inputClass} />
      <label className="block text-sm font-medium mb-1" htmlFor="booster-endDate">Date de fin</label>
      <input id="booster-endDate" name="endDate" type="date" placeholder="Date de fin" value={form.endDate} onChange={onChange} className={inputClass} />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="isSpecial" checked={!!form.isSpecial} onChange={onChange} className="accent-blue-600" /> Is Special
      </label>
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
      <button
        type="submit"
        disabled={loading}
        className="mt-2 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold text-base shadow hover:from-blue-700 hover:to-blue-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
      >{loading ? 'Création...' : 'Créer'}</button>
    </form>
  );
} 