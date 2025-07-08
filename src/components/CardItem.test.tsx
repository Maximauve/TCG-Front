import { render, screen, fireEvent } from '@testing-library/react';
import CardItem from './CardItem';

describe('CardItem', () => {
  it('affiche le nom et la rareté', () => {
    render(<CardItem name="Carte Test" rarity="rare" image="img.png" id={1} />);
    screen.getByText('Carte Test');
    screen.getByText(/rare/i);
  });
}); 