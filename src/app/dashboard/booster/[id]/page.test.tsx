import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BoosterDetailPage from './page';
import * as nextNavigation from 'next/navigation';
import * as collectionService from '@/src/services/collection.service';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/src/services/base.service';
import { SessionProvider } from 'next-auth/react';

jest.mock('next/navigation');
jest.mock('@/src/services/collection.service');

const mockBooster = {
  id: 1,
  name: 'Test Booster',
  description: 'Description du booster',
  displayImage: null,
  releaseDate: '2024-04-05T00:00:00.000Z',
  endDate: '2024-05-01T00:00:00.000Z',
  cards: [
    {
      id: 10,
      name: 'Carte 1',
      image: null,
      rarity: 'rare',
      artist: 'Artiste 1',
    },
    {
      id: 11,
      name: 'Carte 2',
      image: null,
      rarity: 'common',
      artist: 'Artiste 2',
    },
  ],
};

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

describe('BoosterDetailPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (nextNavigation.useParams as jest.Mock).mockReturnValue({ id: '1' });
  });

  it('affiche le loader pendant le chargement', () => {
    (collectionService.useGetCollectionByIdQuery as jest.Mock).mockReturnValue({ isLoading: true });
    render(
      <SessionProvider session={null}>
        <Provider store={store}>
          <BoosterDetailPage />
        </Provider>
      </SessionProvider>
    );
    screen.getByRole('status');
  });

  it('affiche une erreur si la requête échoue', () => {
    (collectionService.useGetCollectionByIdQuery as jest.Mock).mockReturnValue({ isLoading: false, error: true });
    render(
      <SessionProvider session={null}>
        <Provider store={store}>
          <BoosterDetailPage />
        </Provider>
      </SessionProvider>
    );
    screen.getByText(/erreur lors du chargement/i);
  });

  it('affiche le bouton pour ouvrir la modal d\'ajout de carte', () => {
    (collectionService.useGetCollectionByIdQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: false,
      data: mockBooster,
    });
    render(
      <SessionProvider session={null}>
        <Provider store={store}>
          <BoosterDetailPage />
        </Provider>
      </SessionProvider>
    );
    screen.getByRole('button', { name: /ajouter une carte/i });
  });

  it('ouvre la modal d\'ajout de carte au clic', async () => {
    (collectionService.useGetCollectionByIdQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: false,
      data: mockBooster,
    });
    render(
      <SessionProvider session={null}>
        <Provider store={store}>
          <BoosterDetailPage />
        </Provider>
      </SessionProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: /ajouter une carte/i }));
    await waitFor(() => {
      screen.getByRole('heading', { name: /ajouter une carte/i });
      screen.getByLabelText(/nom de la carte/i);
    });
  });
}); 