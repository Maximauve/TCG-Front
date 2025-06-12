import { useTranslation } from 'react-i18next';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

interface ConnectionStatus {
  provider: string;
  connected: boolean;
}

export default function ThirdPartyConnections() {
  const { t } = useTranslation();
  const { data: session, update } = useSession();
  const [isDisconnecting, setIsDisconnecting] = useState<string | null>(null);

  const connections: ConnectionStatus[] = [
    { provider: 'google', connected: !!session?.user?.googleId },
    { provider: 'discord', connected: !!session?.user?.discordId },
    { provider: 'twitch', connected: !!session?.user?.twitchId },
  ];

  const handleConnect = (provider: string) => {
    signIn(provider, { callbackUrl: '/profile' });
  };

  const handleDisconnect = async (provider: string) => {
    try {
      setIsDisconnecting(provider);
      
      const res = await fetch('/api/auth/disconnect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ provider }),
      });

      if (!res.ok) {
        throw new Error('Erreur lors de la déconnexion');
      }

      await update({
        ...session,
        user: {
          ...session?.user,
          [`${provider}Id`]: undefined,
        },
      });
    } catch (error) {
      console.error(`Erreur lors de la déconnexion de ${provider}:`, error);
    } finally {
      setIsDisconnecting(null);
    }
  };

  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        {t('profile.connections.title')}
      </h3>
      <div className="space-y-4">
        {connections.map((connection) => (
          <div 
            key={connection.provider} 
            className={`flex items-center justify-between p-4 rounded-lg border ${
              connection.connected 
                ? 'bg-green-50 border-green-200' 
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-full ${
                connection.connected ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <img
                  src={`/icons/${connection.provider}.svg`}
                  alt={connection.provider}
                  className="w-6 h-6"
                />
              </div>
              <div>
                <span className="capitalize font-medium text-gray-900">
                  {connection.provider}
                </span>
                <p className="text-sm text-gray-500">
                  {connection.connected ? 'Connecté' : 'Non connecté'}
                </p>
              </div>
            </div>
            {connection.connected ? (
              <button
                onClick={() => handleDisconnect(connection.provider)}
                disabled={isDisconnecting === connection.provider}
                className={`px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors ${
                  isDisconnecting === connection.provider ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isDisconnecting === connection.provider 
                  ? t('profile.connections.disconnecting') 
                  : t('profile.connections.disconnect')}
              </button>
            ) : (
              <button
                onClick={() => handleConnect(connection.provider)}
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
              >
                {t('profile.connections.connect')}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 