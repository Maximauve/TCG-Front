"use client"

import { useSession } from 'next-auth/react';
import HomePage from '../components/HomePage';
import UserPage from '../components/UserPage';
import UserMenu from '../components/UserMenu';
import CardModal from '../components/CardModal';
import { Card } from "@/src/types/model/Card"
import { useEffect, useRef, useState } from 'react';
import Navbar from "../components/Navbar";
import Image from 'next/image';

export default function Home() {
  const { data: session, status } = useSession();
  const [selected, setSelected] = useState<Card | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selected) return;
    function handleClick(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSelected(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [selected]);

  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  // if (!session) {
  //   return <HomePage />;
  // }

  return (
    <div className="flex flex-col min-h-screen items-center justify-between">
      <Navbar />
      <header className="w-full flex flex-col items-center mt-12 mb-8">
        <Image
          src="/logo_tcg.png"
          alt="Logo du projet"
          width={100}
          height={30}
          priority
        />
        <h1 className="text-4xl sm:text-5xl font-bold text-center mt-6 mb-2 text-blue-700">
          TCG Online Exchange
        </h1>
        <p className="text-lg sm:text-xl text-center text-gray-700 max-w-xl mb-4">
          Échangez et collectionnez vos cartes à jouer en ligne, avec une expérience sociale grâce à Discord et Twitch.
        </p>
      </header>

      <main className="flex flex-col items-center gap-10 w-full flex-1">
        <div className="flex gap-6 mb-8">
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-3 rounded-full shadow transition-colors text-lg"
          >
            <Image style={{ filter: "brightness(100)" }} src="/icons/discord.svg" alt="Discord" width={28} height={28} />
            Rejoindre Discord
          </a>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-full shadow transition-colors text-lg"
          >
            <Image style={{ filter: "brightness(100)" }} src="/icons/twitch.svg" alt="Twitch" width={28} height={28} />
            Voir sur Twitch
          </a>
        </div>

        <section className="w-full max-w-2xl bg-blue-50 rounded-xl shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">Comment ça marche ?</h2>
          <ol className="flex flex-col sm:flex-row justify-between items-center gap-6 text-center">
            <li className="flex-1 text-gray-800">
              <div className="text-3xl font-bold mb-2 text-blue-400">1</div>
              Inscrivez-vous et créez votre collection
            </li>
            <li className="flex-1 text-gray-800">
              <div className="text-3xl font-bold mb-2 text-blue-400">2</div>
              Échangez des cartes avec d'autres joueurs
            </li>
            <li className="flex-1 text-gray-800">
              <div className="text-3xl font-bold mb-2 text-blue-400">3</div>
              Connectez Discord/Twitch pour des bonus exclusifs
            </li>
          </ol>
        </section>

        <section className="w-full max-w-2xl bg-white rounded-xl shadow p-6 border border-blue-100">
          <h3 className="text-xl font-semibold mb-2 text-center text-blue-700">Les + de TCG Online Exchange</h3>
          <ul className="list-disc list-inside text-gray-700 text-center">
            <li>Échanges rapides et sécurisés</li>
            <li>Communauté active et événements réguliers</li>
            <li>Intégrations sociales pour plus de fun</li>
          </ul>
        </section>
      </main>

      <footer className="w-full flex flex-col items-center gap-1 py-6 text-gray-400 text-sm mt-8 border-t border-blue-50 bg-white">
        <span>&copy; {new Date().getFullYear()} TCG Online Exchange</span>
        <span>Projet étudiant – M2 Coordination Front/Back</span>
      </footer>
    </div>
  );
}
