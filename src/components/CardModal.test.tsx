import { render, screen } from '@testing-library/react';
import CardModal from './CardModal';

describe('CardModal', () => {
  it('affiche la modale avec le nom de la carte', () => {
    render(<CardModal selected={{ name: 'Carte Test', image: '', rarity: 'rare' }} onClose={() => {}} />);
    screen.getByText('Carte Test');
  });
}); 