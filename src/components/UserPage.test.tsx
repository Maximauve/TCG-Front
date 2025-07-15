import { render, screen } from '@testing-library/react';
import UserPage from './UserPage';
import * as cardService from '../services/card.service';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

jest.mock('../services/card.service');

const store = configureStore({ reducer: {} });

describe('UserPage', () => {
  beforeEach(() => {
    (cardService.useGetLatestCardsQuery as jest.Mock).mockReturnValue({ data: [] });
  });

  it('affiche le titre Mes cartes', () => {
    render(
      <Provider store={store}>
        <UserPage onSelect={() => {}} />
      </Provider>
    );
    screen.getByText('Mes cartes');
  });
}); 