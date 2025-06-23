import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import DiscordProvider from "next-auth/providers/discord"
import TwitchProvider from "next-auth/providers/twitch"
import CredentialsProvider from "next-auth/providers/credentials"
import { jwtDecode } from "jwt-decode"

interface DecodedToken {
  user: {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
    description: string;
    googleId?: string;
    twitchId?: string;
    discordId?: string
  };
  roles: string[];
}

interface OAuthPayload {
  provider: string;
  providerId: string;
  email: string;
  name: string;
  given_name?: string;
  family_name?: string;
}

declare module "next-auth" {
  interface Session {
    token?: string;
    user: {
      id: string;
      email: string;
      username: string;
      firstName: string;
      lastName: string;
      profilePicture: string;
      description: string;
      roles: string[];
      googleId?: string;
      twitchId?: string;
      discordId?: string;
    }
  }
  interface User {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
    description: string;
    roles: string[];
    token?: string;
    googleId?: string;
    twitchId?: string;
    discordId?: string;
  }
  interface Profile {
    sub?: string;
    id?: string;
    given_name?: string;
    family_name?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    roles: string[];
    user?: {
      id: string;
      email: string;
      username: string;
      firstName: string;
      lastName: string;
      profilePicture: string;
      description: string;
      roles: string[];
      googleId?: string;
      twitchId?: string;
      discordId?: string;
    }
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID as string,
      clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email et mot de passe requis');
          }

          const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/login_check`;

          const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message || 'Erreur d\'authentification');
          }

          if (data.token) {
            try {
              const decodedToken = jwtDecode<DecodedToken>(data.token);
              
              if (!decodedToken.user) {
                throw new Error('Structure de données utilisateur invalide dans le token');
              }

              return {
                id: decodedToken.user.id,
                email: decodedToken.user.email,
                username: decodedToken.user.username,
                firstName: decodedToken.user.firstName,
                lastName: decodedToken.user.lastName,
                profilePicture: decodedToken.user.profilePicture,
                description: decodedToken.user.description,
                googleId: decodedToken.user.googleId,
                discordId: decodedToken.user.discordId,
                twitchId: decodedToken.user.twitchId,
                roles: decodedToken.roles,
                token: data.token,
              };
            } catch (error) {
              throw new Error('Erreur lors du décodage du token');
            }
          }

          throw new Error('Token non reçu');
        } catch (error) {
          throw error;
        }
      }
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("USER : ", user)
      console.log("ACCOUNT : ", account)
      console.log("PROFILE : ", profile)
      if (account?.provider !== 'credentials') {
        try {
          const payload: OAuthPayload = {
            provider: account?.provider || '',
            providerId: user.id || '',
            email: user.email || '',
            name: user.name || '',
          };

          if (account?.provider === 'google' && profile) {
            payload.given_name = profile.given_name;
            payload.family_name = profile.family_name;
          }

          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/oauth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message || 'OAuth registration failed');
          }

          if (data.token) {
            user.token = data.token;
            if (account && account.provider === 'google') {
              user.googleId = profile?.sub;
            } else if (account && account.provider === 'twitch') {
              user.twitchId = profile?.sub;
            } else if (account && account.provider === 'discord') {
              user.discordId = profile?.id;
            }
            return true;
          }
        } catch (error) {
          return false;
        }
      }
      return true;
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.token = account.access_token;
        token.refreshToken = account.refresh_token;
        token.idToken = account.id_token;
      }
      if (user) {
        token.user = {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          profilePicture: user.profilePicture,
          description: user.description,
          roles: user.roles,
          googleId: user.googleId,
          twitchId: user.twitchId,
          discordId: user.discordId,
        };
        token.roles = user.roles;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.token = token.accessToken;
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1h
  },
  debug: true,
})

export { handler as GET, handler as POST }
