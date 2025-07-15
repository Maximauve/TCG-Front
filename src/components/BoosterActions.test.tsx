import { render, screen, fireEvent } from '@testing-library/react';
import BoosterActions from './BoosterActions';

describe('BoosterActions', () => {
  it('affiche le bouton Ajouter une carte', () => {
    const onAddCard = jest.fn();
    render(<BoosterActions onAddCard={onAddCard} />);
    const btn = screen.getByRole('button', { name: /ajouter une carte/i });
    fireEvent.click(btn);
    expect(onAddCard).toHaveBeenCalled();
  });
}); 