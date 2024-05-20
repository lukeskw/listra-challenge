import { render, fireEvent, screen, act } from '@testing-library/react'
import { SimulationComponent } from '../components/simulationComponent'
import { VehicleProvider } from '../contexts/vehicleContext'
import { Vehicle } from '@/@types/vehicle'
import { vi } from 'vitest'

vi.stubEnv('NEXT_PUBLIC_API_PROTOCOL', 'http')
vi.stubEnv('NEXT_PUBLIC_API_URI', 'localhost')
vi.stubEnv('NEXT_PUBLIC_API_PORT', '8085')
vi.stubEnv('NEXT_PUBLIC_API_PATH', 'api')

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    photoURL: '/car1.jpg',
    city: 'São Paulo',
    brand: 'Toyota',
    model: 'Corolla',
    description: 'Um carro confortável',
    year: 2020,
    mileage: 15000,
    transmission: 'Automática',
    phone: '123456789',
    price: 100000,
    created_at: '2024-05-19',
    updated_at: '2024-05-19',
  },
  {
    id: '2',
    photoURL: '/car2.jpg',
    city: 'Rio de Janeiro',
    brand: 'Honda',
    model: 'Civic',
    description: 'Um carro esportivo',
    year: 2019,
    mileage: 30000,
    transmission: 'Manual',
    phone: '987654321',
    price: 200000,
    created_at: '2024-05-19',
    updated_at: '2024-05-19',
  },
]

test('renders simulation component and handles form submission', async () => {
  await act(async () => {
    render(
      <VehicleProvider>
        <SimulationComponent vehicles={mockVehicles} />
      </VehicleProvider>,
    )
  })

  await act(async () => {
    fireEvent.change(screen.getByPlaceholderText('Insira a entrada desejada'), {
      target: { value: '50000' },
    })
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } })
    fireEvent.click(screen.getByText('Simular'))
  })
  expect(screen.getByPlaceholderText('Insira a entrada desejada')).toHaveValue(
    50000,
  )
})
