import { render, screen, fireEvent } from '@testing-library/react';
import EasterEggModal from './EasterEggModal';

describe('EasterEggModal', () => {
  it('affiche l\'image et ferme la modale', () => {
    render(<EasterEggModal />);
    fireEvent.click(screen.getByLabelText('Easter Egg'), { ctrlKey: true });
    screen.getByAltText('Easter Egg');
    fireEvent.click(screen.getByLabelText('Fermer'));
  });
}); 