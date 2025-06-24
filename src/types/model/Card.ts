import { User } from "@sentry/nextjs";

export interface Card {
  id: string,
  name: string;
  description: string;
  image: string;
  rarity: string;
  users: User[];
  collection: string;
  artist: string;
  obtained_from: string;
  obtained_at: string;
}