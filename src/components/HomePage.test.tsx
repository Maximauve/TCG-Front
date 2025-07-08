import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('affiche le titre principal', () => {
    render(<HomePage />);
    screen.getByRole('heading');
  });
}); 