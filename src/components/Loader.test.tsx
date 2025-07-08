import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
  it('affiche le loader', () => {
    render(<Loader />);
    screen.getByTestId('loading-spinner');
  });
}); 