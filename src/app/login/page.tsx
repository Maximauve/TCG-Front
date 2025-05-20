"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Connexion</h1>
        
        {status === "loading" ? (
          <div className="flex justify-center my-8">
            <div className="w-8 h-8 border-4 border-t-blue-500 rounded-full animate-spin"></div>
            <span className="ml-2">Chargement...</span>
          </div>
        ) : session ? (
          <div className="space-y-6">
            <div className="flex items-center justify-center">
              {session.user?.image && (
                <img
                  src={session.user.image} 
                  alt="Avatar" 
                  className="w-16 h-16 rounded-full mr-4" 
                />
              )}
              <div>
                <p className="font-medium">{session.user?.name}</p>
                <p className="text-sm text-gray-500">{session.user?.email}</p>
              </div>
            </div>
            
            <button
              onClick={() => signOut()}
              className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-center text-gray-600 mb-4">
              Connectez-vous
            </p>
            
            <button
              onClick={() => signIn("google")}
              className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors text-black"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path
                    fill="#4285F4"
                    d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                  />
                  <path
                    fill="#34A853"
                    d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                  />
                </g>
              </svg>
              Se connecter avec Google
            </button>
            
            <button
              onClick={() => signIn("discord")}
              className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors text-black"
            >
              <svg 
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 127.14 96.36"
              >
                <path 
                  fill="#5865F2" 
                  d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"
                />
              </svg>
              Se connecter avec Discord
            </button>
            
            <button
              onClick={() => signIn("twitch")}
              className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors text-black"
            >
              <svg 
                className="w-5 h-5 mr-2" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24"
              >
                <path 
                  fill="#9146FF" 
                  d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"
                />
              </svg>
              Se connecter avec Twitch
            </button>
          </div>
        )}
      </div>
    </div>
  );
}