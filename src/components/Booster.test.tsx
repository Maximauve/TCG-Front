import { render, screen } from '@testing-library/react';
import { Booster } from './Booster';

describe('Booster', () => {
  it('affiche l\'image du booster', () => {
    render(<Booster image="img.png" />);
    expect(screen.getByAltText('Booster')).toBeInTheDocument();
  });
}); 