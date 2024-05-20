import { render } from '@testing-library/react'
import { Header } from '../components/header.tsx'

test('renders the header with the logo', () => {
  const { getByAltText } = render(<Header />)
  const logo = getByAltText('main-logo')
  expect(logo).toBeVisible()
})
