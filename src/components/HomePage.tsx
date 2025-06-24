export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Bienvenue sur TCG !</h1>
      <p className="mb-4">Connecte-toi ou inscris-toi pour profiter de toutes les fonctionnalités.</p>
      <a href="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Connexion / Inscription</a>
    </div>
  );
} 