import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProfilePage from '../page'
import { useTranslation } from 'react-i18next'
import { SessionProvider } from 'next-auth/react'

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: {
        id: '1',
        username: 'testuser',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'USER',
        profilePicture: 'https://example.com/avatar.jpg',
      },
      expires: '1',
    },
    status: 'authenticated',
  }),
  SessionProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

// Mock i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: { [key: string]: string } = {
        'profile.title': 'Profile',
        'profile.edit': 'Edit Profile',
        'profile.cancel': 'Cancel',
        'profile.save': 'Save Changes',
        'profile.delete': 'Delete Account',
        'profile.fields.firstName': 'First Name',
        'profile.fields.lastName': 'Last Name',
        'profile.fields.username': 'Username',
        'profile.fields.email': 'Email',
        'profile.fields.password': 'Password',
        'profile.fields.description': 'Description',
        'profile.fields.profilePicture': 'Profile Picture',
        'profile.connections.title': 'Connected Accounts',
        'profile.connections.connect': 'Connect',
        'profile.connections.disconnect': 'Disconnect',
      }
      return translations[key] || key
    },
  }),
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
  }),
  useParams: () => ({})
}))

// Mock user service
jest.mock('@/src/services/user.service', () => ({
  useGetUserByIdQuery: () => ({
    data: null,
    isLoading: false,
  }),
  useUpdateUserMutation: () => [jest.fn()],
  useDeleteUserMutation: () => [jest.fn()],
}))

const renderWithSession = (component: React.ReactNode) => {
  return render(
    <SessionProvider session={null}>
      {component}
    </SessionProvider>
  )
}

describe('ProfilePage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders profile information', () => {
    renderWithSession(<ProfilePage />)

    expect(screen.getByLabelText('Username')).toHaveValue('testuser')
    expect(screen.getByLabelText('Email')).toHaveValue('test@example.com')
    expect(screen.getByLabelText('First Name')).toHaveValue('John')
    expect(screen.getByLabelText('Last Name')).toHaveValue('Doe')
  })

  it('shows edit button when not in edit mode', () => {
    renderWithSession(<ProfilePage />)

    const editButton = screen.getByRole('button', { name: 'Edit Profile' })
    expect(editButton).toBeInTheDocument()
  })

  it('shows save and cancel buttons when in edit mode', () => {
    renderWithSession(<ProfilePage />)

    const editButton = screen.getByRole('button', { name: 'Edit Profile' })
    fireEvent.click(editButton)

    expect(screen.getByRole('button', { name: 'Save Changes' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })

  it('renders third party connections section', () => {
    renderWithSession(<ProfilePage />)

    expect(screen.getByText('Connected Accounts')).toBeInTheDocument()
  })

  it('handles profile picture display', () => {
    renderWithSession(<ProfilePage />)

    const profilePicture = screen.getByAltText('Profile Picture')
    expect(profilePicture).toHaveAttribute('src', 'https://example.com/avatar.jpg')
  })
}) 