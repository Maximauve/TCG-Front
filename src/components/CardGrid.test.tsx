import { render, screen } from '@testing-library/react';
import CardGrid from './CardGrid';

describe('CardGrid', () => {
  it('affiche la liste des cartes', () => {
    const cards = [
      { id: 1, name: 'Carte Alpha', image: 'img1.png', rarity: 'common' },
      { id: 2, name: 'Carte Beta', image: 'img2.png', rarity: 'rare' },
    ];
    render(<CardGrid cards={cards} />);
    screen.getByText('Carte Alpha');
    screen.getByText('Carte Beta');
  });
}); 