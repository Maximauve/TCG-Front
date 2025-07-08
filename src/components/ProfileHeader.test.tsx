import { render, screen } from '@testing-library/react';
import ProfileHeader from './ProfileHeader';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      if (key === 'profile.title') return 'Mon profil';
      if (key === 'logout') return 'Déconnexion';
      if (key === 'profile.edit') return 'Éditer';
      if (key === 'profile.cancel') return 'Annuler';
      return key;
    },
  }),
}));

describe('ProfileHeader', () => {
  it('affiche le titre du profil', () => {
    render(<ProfileHeader />);
    screen.getByText('Mon profil');
  });
}); 