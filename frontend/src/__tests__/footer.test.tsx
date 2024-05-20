import { render } from '@testing-library/react'
import { Footer } from '../components/footer.tsx'

test('renders the footer with social media links', () => {
  const { getByRole } = render(<Footer />)
  expect(getByRole('heading', { name: /Encontre seu veículo/i })).toBeVisible()
  expect(getByRole('heading', { name: /A Empresa/i })).toBeVisible()
  expect(getByRole('heading', { name: 'Atendimento' })).toBeVisible()
  expect(getByRole('heading', { name: /Lojistas/ })).toBeVisible()
})
