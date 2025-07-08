import { render, screen } from '@testing-library/react';
import BoosterModal from './BoosterModal';

describe('BoosterModal', () => {
  it('affiche le titre de la modale', () => {
    render(
      <BoosterModal open={true} onClose={() => {}}>
        <div>Contenu</div>
      </BoosterModal>
    );
    screen.getByText('Ajouter une carte');
  });
}); 