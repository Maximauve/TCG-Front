import { render, screen } from '@testing-library/react';
import UserMenu from './UserMenu';

jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: { user: { profilePicture: 'img.png' } },
    status: 'authenticated',
  }),
  signOut: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    refresh: jest.fn(),
  }),
}));

describe('UserMenu', () => {
  it('affiche le menu utilisateur', () => {
    render(<UserMenu />);
    screen.getByAltText('Photo de profil');
  });
}); 