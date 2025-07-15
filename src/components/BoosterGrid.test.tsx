import { render, screen } from '@testing-library/react';
import BoosterGrid from './BoosterGrid';

describe('BoosterGrid', () => {
  it('affiche la liste des boosters', () => {
    const boosters = [
      { id: 1, name: 'Booster Alpha', image: 'img1.png' },
      { id: 2, name: 'Booster Beta', image: 'img2.png' },
    ];
    render(<BoosterGrid boosters={boosters} />);
    screen.getByText('Booster Alpha');
    screen.getByText('Booster Beta');
  });
}); 