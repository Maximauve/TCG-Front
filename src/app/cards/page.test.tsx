import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CardsPage from './page';
import * as cardService from '@/src/services/card.service';
import React from 'react';

jest.mock('@/src/services/card.service');
jest.mock('@/src/components/CardsList', () => (props: any) => (
  <div data-testid="cards-list-mock">
    {props.cards.map((card: any) => (
      <div key={card.name} onClick={() => props.onSelect(card)}>{card.name} ({card.rarity}) x{card.quantity}</div>
    ))}
  </div>
));
jest.mock('@/src/components/CardModal', () => (props: any) => (
  <div data-testid="card-modal-mock">
    <span>Modal ouverte pour {props.selected.name}</span>
    <button onClick={props.onClose}>Fermer</button>
  </div>
));
jest.mock('@/src/components/Navbar', () => () => <nav data-testid="navbar-mock">Navbar</nav>);

const mockCards = [
  { id: 1, name: 'Carte Alpha', rarity: 'common', image: null, artist: 'Artiste 1' },
  { id: 2, name: 'Carte Beta', rarity: 'rare', image: null, artist: 'Artiste 2' },
  { id: 3, name: 'Carte Alpha', rarity: 'common', image: null, artist: 'Artiste 1' },
];

describe('CardsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (cardService.useGetCardsQuery as jest.Mock).mockReturnValue({ data: mockCards });
  });

  it('affiche le titre et la navbar', () => {
    render(<CardsPage />);
    screen.getByText('Mes cartes');
    screen.getByTestId('navbar-mock');
  });

  it('affiche le select de tri avec toutes les options', () => {
    render(<CardsPage />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(screen.getByText('Rareté (Rare → Commun)')).toBeInTheDocument();
    expect(screen.getByText('Rareté (Commun → Rare)')).toBeInTheDocument();
    expect(screen.getByText('Nom (A → Z)')).toBeInTheDocument();
    expect(screen.getByText('Nom (Z → A)')).toBeInTheDocument();
    expect(screen.getByText('Quantité (plus → moins)')).toBeInTheDocument();
    expect(screen.getByText('Quantité (moins → plus)')).toBeInTheDocument();
  });

  it('affiche la liste des cartes agrégées', () => {
    render(<CardsPage />);
    // Carte Alpha doit apparaître une seule fois avec quantité 2
    screen.getByText(/Carte Alpha \(common\) x2/);
    screen.getByText(/Carte Beta \(rare\) x1/);
  });

  it('ouvre la modale au clic sur une carte et la ferme', () => {
    render(<CardsPage />);
    fireEvent.click(screen.getByText(/Carte Alpha \(common\) x2/));
    screen.getByTestId('card-modal-mock');
    screen.getByText(/Modal ouverte pour Carte Alpha/);
    fireEvent.click(screen.getByText('Fermer'));
    // La modale doit disparaître
    expect(screen.queryByTestId('card-modal-mock')).toBeNull();
  });

  it('change le tri et vérifie l’ordre', () => {
    render(<CardsPage />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'name_asc' } });
    // Après tri alphabétique, Carte Alpha doit être avant Carte Beta
    const items = screen.getAllByText(/Carte/);
    expect(items[0].textContent).toMatch(/Carte Alpha/);
    expect(items[1].textContent).toMatch(/Carte Beta/);
  });

  it('affiche un message si aucune carte', () => {
    (cardService.useGetCardsQuery as jest.Mock).mockReturnValue({ data: [] });
    render(<CardsPage />);
    // À adapter selon le comportement réel de CardsList
    // Ici on vérifie juste que la liste est vide
    expect(screen.getByTestId('cards-list-mock').textContent).toBe("");
  });
}); 