import { render, screen, fireEvent } from '@testing-library/react';
import BoosterItem from './BoosterItem';

describe('BoosterItem', () => {
  it('affiche le nom du booster', () => {
    render(<BoosterItem name="Booster Test" image="img.png" />);
    screen.getByText('Booster Test');
  });

  it('appelle onClick si fourni', () => {
    const onClick = jest.fn();
    render(<BoosterItem name="Booster Test" image="img.png" onClick={onClick} />);
    fireEvent.click(screen.getByText('Booster Test'));
    expect(onClick).toHaveBeenCalled();
  });
}); 