import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

jest.mock('next-auth/react', () => ({
  useSession: () => ({ data: null, status: 'unauthenticated' }),
  signOut: jest.fn(),
}));

describe('Navbar', () => {
  it('affiche les liens de connexion/inscription si non connecté', () => {
    render(<Navbar />);
    screen.getByText(/Inscription/i);
    screen.getByText(/Connexion/i);
  });
}); 