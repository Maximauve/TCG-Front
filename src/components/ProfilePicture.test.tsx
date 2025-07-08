import { render, screen } from '@testing-library/react';
import ProfilePicture from './ProfilePicture';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: () => 'Photo de profil',
  }),
}));

describe('ProfilePicture', () => {
  it('affiche l\'image de profil', () => {
    render(<ProfilePicture profilePicture="img.png" />);
    expect(screen.getByAltText('Photo de profil')).toBeInTheDocument();
  });
}); 