import { render, screen, fireEvent } from '@testing-library/react';
import CardsList from './CardsList';

describe('CardsList', () => {
  it('affiche la liste des cartes', () => {
    const cards = [
      { id: 1, name: 'Carte Alpha', image: 'img1.png', rarity: 'common' },
      { id: 2, name: 'Carte Beta', image: 'img2.png', rarity: 'rare' },
    ];
    render(<CardsList cards={cards} onSelect={() => {}} />);
    screen.getByAltText('Carte Alpha');
    screen.getByAltText('Carte Beta');
  });

  it('appelle onSelect quand on clique sur une carte', () => {
    const onSelect = jest.fn();
    const cards = [
      { id: 1, name: 'Carte Alpha', image: 'img1.png', rarity: 'common' },
    ];
    render(<CardsList cards={cards} onSelect={onSelect} />);
    fireEvent.click(screen.getByAltText('Carte Alpha'));
    expect(onSelect).toHaveBeenCalledWith(cards[0]);
  });
}); 