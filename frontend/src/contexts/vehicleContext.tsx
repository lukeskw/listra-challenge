'use client'

import { Vehicle, Installment } from '@/@types/vehicle'
import { apiBaseURL } from '@/lib/api'
import { ReactNode, createContext, useContext, useState } from 'react'

export interface VehicleContextType {
  simulate: (downPaymentValue: string) => void
  setSelectedVehicleId: (id: string) => void
  setVehicle: (data?: Vehicle) => void
  vehicle?: Vehicle
  simulation: Installment[] | []
  setSimulation: (data: Installment[]) => void
  isLoading: boolean
}

interface InstallmentAPIReturn {
  data: {
    installments: Installment[]
  }
}

const VehicleContext = createContext({} as VehicleContextType)

export function VehicleProvider({ children }: { children: ReactNode }) {
  const [selectedVehicleId, setSelectedVehicleId] = useState('')
  const [vehicle, setVehicle] = useState<Vehicle | undefined>()
  const [simulation, setSimulation] = useState<Installment[] | []>([])
  const [isLoading, setIsLoading] = useState(false)
  async function simulate(downPaymentValue: string) {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${apiBaseURL}/api/vehicles/${selectedVehicleId}/simulate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            down_payment: Number(downPaymentValue) * 100,
          }),
        },
      )

      if (!response.ok) {
        setIsLoading(false)
        throw new Error('Network response was not ok')
      }

      const data: InstallmentAPIReturn = await response.json()
      setSimulation(data.data.installments)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error('Error:', error)
    }
  }

  return (
    <VehicleContext.Provider
      value={{
        simulate,
        setSelectedVehicleId,
        setVehicle,
        vehicle,
        simulation,
        setSimulation,
        isLoading,
      }}
    >
      {children}
    </VehicleContext.Provider>
  )
}

export const useVehicle = () => useContext(VehicleContext)
