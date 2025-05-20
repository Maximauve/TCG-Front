"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export default function Hello() {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(status);
    console.log(session);
  }, [status, session]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 text-center">
        <h1 className="text-2xl font-bold mb-6">Google Auth Demo</h1>
        
        {status === "loading" ? (
          <div className="flex justify-center my-4">
            <div className="w-6 h-6 border-2 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : session ? (
          <div className="space-y-4">
            <p>Connecté en tant que <strong>{session.user?.name}</strong></p>
            <Link 
              href="/login" 
              className="inline-block py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Voir mon token
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <p>Vous n'êtes pas connecté</p>
            <Link 
              href="/login" 
              className="inline-block py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Connexion avec Google
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}