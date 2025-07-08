import { render, screen, fireEvent } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('affiche le titre et l\'image', () => {
    render(<Card image="img.png" title="Carte Test" rarity="rare" />);
    expect(screen.getByAltText('Carte Test')).toBeInTheDocument();
  });

  it('appelle onClick quand on clique', () => {
    const onClick = jest.fn();
    render(<Card image="img.png" title="Carte Test" onClick={onClick} />);
    fireEvent.click(screen.getByAltText('Carte Test'));
    expect(onClick).toHaveBeenCalled();
  });
}); 