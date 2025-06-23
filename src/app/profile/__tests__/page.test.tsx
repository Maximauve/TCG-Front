import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfilePage from '../[id]/page';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

jest.mock('next-auth/react');
jest.mock('next/navigation');
jest.mock('react-i18next');
jest.mock('@/src/core/toast', () => ({
  showToast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockGetCurrentUserQuery = jest.fn();
const mockGetUserByIdQuery = jest.fn();
const mockUpdateUserMutation = jest.fn();
const mockDeleteUserMutation = jest.fn();

jest.mock('@/src/services/user.service', () => ({
  useGetCurrentUserQuery: () => mockGetCurrentUserQuery(),
  useGetUserByIdQuery: () => mockGetUserByIdQuery(),
  useUpdateUserMutation: () => [mockUpdateUserMutation],
  useDeleteUserMutation: () => [mockDeleteUserMutation],
}));

describe('ProfilePage', () => {
  const mockUser = {
    id: '1',
    email: 'test@test.com',
    username: 'testuser',
    firstName: 'Test',
    lastName: 'User',
    profilePicture: 'https://example.com/avatar.jpg',
    description: 'Test description',
    roles: ['ROLE_USER'],
  };

  const mockSession = {
    user: mockUser,
  };

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      data: mockSession,
      status: 'authenticated',
    });

    (useParams as jest.Mock).mockReturnValue({});

    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
    });

    mockGetCurrentUserQuery.mockReturnValue({
      data: mockUser,
      isLoading: false,
    });

    mockGetUserByIdQuery.mockReturnValue({
      data: mockUser,
      isLoading: false,
    });

    mockUpdateUserMutation.mockReturnValue({
      unwrap: () => Promise.resolve({ data: mockUser })
    });

    mockDeleteUserMutation.mockReturnValue({
      unwrap: () => Promise.resolve({ data: mockUser })
    });
  });

  it('renders profile page with user data', () => {
    render(<ProfilePage />);
    
    expect(screen.getByDisplayValue(mockUser.email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.firstName)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.lastName)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockUser.description)).toBeInTheDocument();
  });

  it('toggles edit mode when edit button is clicked', () => {
    render(<ProfilePage />);
    
    const editButton = screen.getByRole('button', { name: /profile\.edit/i });
    fireEvent.click(editButton);
    
    expect(screen.getByRole('button', { name: /profile\.save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /profile\.delete/i })).toBeInTheDocument();
  });

  it('resets form data when canceling edit mode', async () => {
    render(<ProfilePage />);
    
    const editButton = screen.getByRole('button', { name: /profile\.edit/i });
    fireEvent.click(editButton);
    
    const firstNameInput = screen.getByDisplayValue(mockUser.firstName);
    fireEvent.change(firstNameInput, { target: { value: 'New Name' } });
    
    const cancelButton = screen.getByRole('button', { name: /profile\.cancel/i });
    fireEvent.click(cancelButton);
    
    expect(screen.getByDisplayValue(mockUser.firstName)).toBeInTheDocument();
  });

  it('handles profile update successfully', async () => {
    render(<ProfilePage />);
    
    const editButton = screen.getByRole('button', { name: /profile\.edit/i });
    fireEvent.click(editButton);
    
    const firstNameInput = screen.getByDisplayValue(mockUser.firstName);
    fireEvent.change(firstNameInput, { target: { value: 'New Name' } });
    
    const submitButton = screen.getByRole('button', { name: /profile\.save/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /profile\.edit/i })).toBeInTheDocument();
    });
  });

  it('handles profile deletion', async () => {
    render(<ProfilePage />);
    
    const editButton = screen.getByRole('button', { name: /profile\.edit/i });
    fireEvent.click(editButton);
    
    const deleteButton = screen.getByRole('button', { name: /profile\.delete/i });
    fireEvent.click(deleteButton);
    
    await waitFor(() => {
      expect(mockDeleteUserMutation).toHaveBeenCalled();
    });
  });

  it('shows loading state when session is loading', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'loading',
    });
  
    mockGetCurrentUserQuery.mockReturnValue({
      data: null,
      isLoading: true,
    });
  
    render(<ProfilePage />);
    
    const loadingSpinner = screen.getByTestId('loading-spinner');
    expect(loadingSpinner).toBeInTheDocument();
    expect(loadingSpinner).toHaveClass('animate-spin');
  });
}); 
