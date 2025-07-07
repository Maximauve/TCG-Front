import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DashboardPage from '../page';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation');
jest.mock('react-toastify', () => ({ toast: { error: jest.fn(), success: jest.fn() } }));

jest.mock('next-auth/react', () => ({
  useSession: () => ({ data: null, status: 'unauthenticated' }),
  signIn: jest.fn(),
  signOut: jest.fn(),
  SessionProvider: ({ children }: any) => <div>{children}</div>,
}));

const mockGetCollectionsQuery = jest.fn();
const mockCreateCollectionMutation = jest.fn();

jest.mock('@/src/services/collection.service', () => ({
  useGetCollectionsQuery: () => mockGetCollectionsQuery(),
  useCreateCollectionMutation: () => [mockCreateCollectionMutation, { isLoading: false }],
}));

describe('DashboardPage', () => {
  const mockRouterPush = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    jest.clearAllMocks();
  });

  it('affiche le titre et le bouton de création', () => {
    mockGetCollectionsQuery.mockReturnValue({ data: [], isLoading: false, error: null });
    render(<DashboardPage />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /créer un booster/i })).toBeInTheDocument();
  });

  it('affiche le chargement', () => {
    mockGetCollectionsQuery.mockReturnValue({ data: null, isLoading: true, error: null });
    render(<DashboardPage />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('affiche une erreur', () => {
    mockGetCollectionsQuery.mockReturnValue({ data: null, isLoading: false, error: true });
    render(<DashboardPage />);
    expect(screen.getByText(/erreur lors du chargement/i)).toBeInTheDocument();
  });

  it('affiche les boosters', () => {
    mockGetCollectionsQuery.mockReturnValue({
      data: [
        { id: '1', name: 'Booster 1', description: 'Desc', displayImage: '', boosterImage: '' },
        { id: '2', name: 'Booster 2', description: 'Desc2', displayImage: '', boosterImage: '' },
      ],
      isLoading: false,
      error: null,
    });
    render(<DashboardPage />);
    expect(screen.getByText('Booster 1')).toBeInTheDocument();
    expect(screen.getByText('Booster 2')).toBeInTheDocument();
  });

  it('ouvre la modal de création', () => {
    mockGetCollectionsQuery.mockReturnValue({ data: [], isLoading: false, error: null });
    render(<DashboardPage />);
    fireEvent.click(screen.getByRole('button', { name: /\+ créer un booster/i }));
    expect(screen.getByRole('heading', { name: /créer un booster/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/nom/i)).toBeInTheDocument();
  });

  it('redirige vers la page booster au clic sur une carte', () => {
    mockGetCollectionsQuery.mockReturnValue({
      data: [
        { id: '1', name: 'Booster 1', description: 'Desc', displayImage: '', boosterImage: '' },
      ],
      isLoading: false,
      error: null,
    });
    render(<DashboardPage />);
    fireEvent.click(screen.getByText('Booster 1'));
    expect(mockRouterPush).toHaveBeenCalledWith('/dashboard/booster/1');
  });
}); 