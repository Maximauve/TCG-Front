import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import OpenPage from './page';
import * as collectionService from '@/src/services/collection.service';
import * as boosterService from '@/src/services/booster.service';
import React from 'react';

jest.mock('@/src/services/collection.service');
jest.mock('@/src/services/booster.service');
jest.mock('@/src/components/Loader', () => ({
  __esModule: true,
  default: () => <div data-testid="loader-mock">Chargement...</div>
}));
jest.mock('@/src/components/Booster', () => ({
  __esModule: true,
  Booster: (props: any) => <div data-testid="booster-mock">Booster {props.image}</div>
}));
jest.mock('@/src/components/Card', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="card-mock">{props.title} ({props.rarity})</div>
}));
jest.mock('@/src/components/Navbar', () => ({
  __esModule: true,
  default: () => <nav data-testid="navbar-mock">Navbar</nav>
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    refresh: jest.fn(),
  }),
}));

const mockCollections = [
  { id: 1, name: 'Collection Alpha', description: 'Desc Alpha', boosterImage: 'alpha.png' },
  { id: 2, name: 'Collection Beta', description: 'Desc Beta', boosterImage: 'beta.png' },
];
const mockBoosterStatus = { can_open_booster: true };
const mockBoosterStatusLocked = { can_open_booster: false, next_booster_at: new Date(Date.now() + 3600 * 1000).toISOString() };
const mockOpenedCards = [
  { id: 10, name: 'Carte 1', rarity: 'rare', image: null },
  { id: 11, name: 'Carte 2', rarity: 'common', image: null },
];

describe('OpenPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (collectionService.useGetCollectionsQuery as jest.Mock).mockReturnValue({ data: mockCollections, isLoading: false, isError: false });
    (boosterService.useGetBoosterStatusQuery as jest.Mock).mockReturnValue({ data: mockBoosterStatus, isLoading: false, isError: false, refetch: jest.fn() });
    (boosterService.useOpenBoosterMutation as jest.Mock).mockReturnValue([
      jest.fn(() => Promise.resolve({ unwrap: () => Promise.resolve({ cards: mockOpenedCards }) })),
      { isLoading: false }
    ]);
  });

  it('affiche le loader si chargement', () => {
    (collectionService.useGetCollectionsQuery as jest.Mock).mockReturnValue({ isLoading: true });
    render(<OpenPage />);
    screen.getByTestId('loader-mock');
  });

  it('affiche une erreur si erreur', () => {
    (collectionService.useGetCollectionsQuery as jest.Mock).mockReturnValue({ isError: true });
    render(<OpenPage />);
    screen.getByText(/Erreur lors du chargement des collections/i);
  });

  it("affiche le message d'indisponibilité si booster non disponible", () => {
    (boosterService.useGetBoosterStatusQuery as jest.Mock).mockReturnValue({ data: mockBoosterStatusLocked, isLoading: false, isError: false, refetch: jest.fn() });
    render(<OpenPage />);
    screen.getByText(/Ouverture de booster indisponible/i);
    screen.getByText(/Vous ne pouvez pas ouvrir de booster pour le moment/i);
    screen.getByText(/Prochain booster disponible le/i);
  });

  it('affiche la liste des collections', () => {
    render(<OpenPage />);
    screen.getByText('Collection Alpha');
    screen.getByText('Collection Beta');
  });

  it('sélectionne une collection et affiche ses détails', () => {
    render(<OpenPage />);
    fireEvent.click(screen.getByText('Collection Alpha'));
    screen.getByText('Desc Alpha');
    screen.getByRole('button', { name: /Ouvrir un booster/i });
  });
}); 