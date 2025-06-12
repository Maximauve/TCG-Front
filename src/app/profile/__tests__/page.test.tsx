import { render, screen, fireEvent } from '@testing-library/react'
import ProfilePage from '../page'
import { useTranslation } from 'react-i18next'

// Mock i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: { [key: string]: string } = {
        'profile.title': 'Profile',
        'profile.actions.edit': 'Edit Profile',
        'profile.actions.save': 'Save Changes',
        'profile.actions.cancel': 'Cancel',
        'profile.thirdParty.title': 'Third Party Connections'
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
  })
}))

describe('ProfilePage', () => {
  const mockUser = {
    id: '1',
    username: 'testuser',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    birthDate: '1990-01-01',
    phoneNumber: '+1234567890',
    address: '123 Main St',
    city: 'New York',
    country: 'USA',
    postalCode: '10001',
    bio: 'Test bio',
    profilePicture: 'https://example.com/avatar.jpg',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    isVerified: true,
    role: 'USER',
    preferences: {
      language: 'en',
      theme: 'light',
      notifications: true
    }
  }

  const mockConnections = {
    google: true,
    github: false,
    discord: true
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders profile information', () => {
    render(<ProfilePage user={mockUser} connections={mockConnections} />)

    expect(screen.getByText('testuser')).toBeInTheDocument()
    expect(screen.getByText('test@example.com')).toBeInTheDocument()
    expect(screen.getByText('John')).toBeInTheDocument()
    expect(screen.getByText('Doe')).toBeInTheDocument()
  })

  it('shows edit button when not in edit mode', () => {
    render(<ProfilePage user={mockUser} connections={mockConnections} />)

    const editButton = screen.getByRole('button', { name: 'Edit Profile' })
    expect(editButton).toBeInTheDocument()
  })

  it('shows save and cancel buttons when in edit mode', () => {
    render(<ProfilePage user={mockUser} connections={mockConnections} />)

    const editButton = screen.getByRole('button', { name: 'Edit Profile' })
    fireEvent.click(editButton)

    expect(screen.getByRole('button', { name: 'Save Changes' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })

  it('renders third party connections section', () => {
    render(<ProfilePage user={mockUser} connections={mockConnections} />)

    expect(screen.getByText('Third Party Connections')).toBeInTheDocument()
    expect(screen.getByText('Google')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('Discord')).toBeInTheDocument()
  })

  it('handles profile picture display', () => {
    render(<ProfilePage user={mockUser} connections={mockConnections} />)

    const profilePicture = screen.getByRole('img')
    expect(profilePicture).toHaveAttribute('src', mockUser.profilePicture)
  })
}) 