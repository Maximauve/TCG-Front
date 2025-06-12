import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../page';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { showToast } from '@/src/core/toast';

// Mock des hooks et fonctions
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
  useSession: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/src/core/toast', () => ({
  showToast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Login Page', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    // Mock useRouter
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    
    // Mock useSession
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    // Mock signIn
    (signIn as jest.Mock).mockResolvedValue({ ok: true, error: null });
  });

  it('renders login form when not authenticated', () => {
    render(<Login />);
    
    expect(screen.getByText('Connexion')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Mot de passe')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Se connecter' })).toBeInTheDocument();
  });

  it('shows loading state', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'loading',
    });

    render(<Login />);
    
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('shows user info and logout button when authenticated', () => {
    const mockUser = {
      username: 'testuser',
      email: 'test@example.com',
      profilePicture: 'https://example.com/avatar.jpg',
    };

    (useSession as jest.Mock).mockReturnValue({
      data: { user: mockUser },
      status: 'authenticated',
    });

    render(<Login />);
    
    expect(screen.getByText(mockUser.username)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Déconnexion' })).toBeInTheDocument();
  });

  it('handles email login successfully', async () => {
    render(<Login />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Mot de passe');
    const submitButton = screen.getByRole('button', { name: 'Se connecter' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        redirect: false,
        email: 'test@example.com',
        password: 'password123',
      });
      expect(showToast.success).toHaveBeenCalledWith('Connexion réussie !');
      expect(mockRouter.push).toHaveBeenCalledWith('/');
    });
  });

  it('handles email login error', async () => {
    (signIn as jest.Mock).mockResolvedValue({ ok: false, error: 'Invalid credentials' });

    render(<Login />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Mot de passe');
    const submitButton = screen.getByRole('button', { name: 'Se connecter' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(showToast.error).toHaveBeenCalledWith('Invalid credentials');
    });
  });

  it('handles social login buttons', () => {
    render(<Login />);
    
    const googleButton = screen.getByRole('button', { name: 'Se connecter avec Google' });
    const discordButton = screen.getByRole('button', { name: 'Se connecter avec Discord' });
    const twitchButton = screen.getByRole('button', { name: 'Se connecter avec Twitch' });

    fireEvent.click(googleButton);
    expect(signIn).toHaveBeenCalledWith('google');

    fireEvent.click(discordButton);
    expect(signIn).toHaveBeenCalledWith('discord');

    fireEvent.click(twitchButton);
    expect(signIn).toHaveBeenCalledWith('twitch');
  });

  it('handles logout', async () => {
    const mockUser = {
      username: 'testuser',
      email: 'test@example.com',
    };

    (useSession as jest.Mock).mockReturnValue({
      data: { user: mockUser },
      status: 'authenticated',
    });

    render(<Login />);
    
    const logoutButton = screen.getByRole('button', { name: 'Déconnexion' });
    fireEvent.click(logoutButton);

    expect(signOut).toHaveBeenCalled();
  });
}); 