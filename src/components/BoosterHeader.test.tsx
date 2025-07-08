import { render, screen } from '@testing-library/react';
import BoosterHeader from './BoosterHeader';

describe('BoosterHeader', () => {
  it('affiche le titre du booster', () => {
    render(
      <BoosterHeader
        name="Super Booster"
        description="Desc"
        releaseDate="2024-01-01"
        endDate="2024-12-31"
      />
    );
    screen.getByRole('heading', { level: 1, name: /Super Booster/i });
  });
}); 