import { render, screen } from '@testing-library/react'
import ResultCard from '../components/ResultCard'
import MatchedMediaMock from 'jest-matchmedia-mock'
import users from '../__mocks__/users'
import Index from '../pages/index'

let matchMedia

describe('HomePage renders all props', () => {
  beforeAll(() => {
    matchMedia = new MatchedMediaMock()
    render(<Index users={users} />)
  })

  afterAll(() => matchMedia.clear())

  test('renders home menu', () => {
    expect(screen.queryByText(/emerald/i)).toBeInTheDocument
  })

  test('renders Menu buttons for filtering gender', () => {
    expect(screen.queryByText(/All users/i)).toBeInTheDocument
  })
})

describe('User Card renders users info correctly', () => {
  beforeAll(() => render(<ResultCard user={users[0]} />))
  const { name, email, location, phone } = users[0]

  test('Displayed user name', () => {
    expect(screen.queryByText(name.first)).toBeInTheDocument
  })

  test('Displayed email address', () => {
    expect(screen.queryByText(email)).toBeInTheDocument
  })

  test('Displayed user location info', () => {
    expect(screen.queryByText(location.state)).toBeInTheDocument
  })

  test('Displayed user Phone number', () => {
    expect(screen.queryByText(phone)).toBeInTheDocument
  })
})
