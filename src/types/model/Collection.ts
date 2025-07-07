import { Card } from "./Card";

export interface Collection {
  id: string;
  name: string;
  description: string;
  owner: string;
  cards: Card[];
  displayImage: string;
  boosterImage: string;
  releaseDate: string;
  endDate: string;
  special: boolean;
  isSpecial: boolean;
}