'use client'
import { Vehicle } from '@/@types/vehicle'
import { useVehicle } from '@/contexts/vehicleContext'
import { useState } from 'react'
import { PiCircleNotch } from 'react-icons/pi'

type SimulationComponentProps = {
  vehicles: Vehicle[]
}

export function SimulationComponent({ vehicles }: SimulationComponentProps) {
  const [downPayment, setDownPayment] = useState(false)
  const [downPaymentValue, setDownPaymentValue] = useState('')
  const {
    simulate,
    setVehicle,
    setSelectedVehicleId,
    simulation,
    setSimulation,
    vehicle,
    isLoading,
  } = useVehicle()

  function handleOpenDownPayment(event: React.ChangeEvent<HTMLSelectElement>) {
    if (!downPayment) setDownPayment(true)
    setSelectedVehicleId(event.target.value)
    setVehicle(vehicles.find((vehicle) => vehicle.id === event.target.value))
    if (simulation && simulation.length > 0) {
      setSimulation([])
    }
  }

  function handleDownPaymentValue(event: React.ChangeEvent<HTMLInputElement>) {
    setDownPaymentValue(event.target.value)
  }

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (vehicle && Number(downPaymentValue) > vehicle?.price) {
      console.error('Down payment value cannot be greater than vehicle price')

      // TODO: add sonner toast on these error fields
      return
    }
    if (!downPayment || downPaymentValue.length === 0) {
      console.error('Vehicle and down payment must be selected')

      // TODO: add sonner toast on these error fields
      return
    }

    simulate(downPaymentValue)
  }

  return (
    <div className="flex flex-col gap-4 rounded bg-white px-12 py-8 shadow-sm">
      <h2 className="text-base font-bold xl:text-lg">
        Selecione um veículo que deseja simular o financiamento
      </h2>
      <form
        className="flex flex-col items-center gap-6 xl:flex-row xl:items-center"
        onSubmit={handleFormSubmit}
      >
        <div className="flex flex-col gap-6">
          <select
            className="h-10 w-80 rounded border border-neutral-300 px-2 text-neutral-600 outline-none focus:ring-1 focus:ring-neutral-400 xl:w-80"
            defaultValue=""
            onChange={handleOpenDownPayment}
          >
            <option value="" disabled>
              Selecione...
            </option>
            {vehicles.map((vehicle) => {
              return (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.model}
                </option>
              )
            })}
          </select>
          <div
            className={`${downPayment ? 'visible flex' : 'invisible hidden'} flex-col gap-2 transition-transform delay-300 duration-300 ease-in-out`}
          >
            <h3 className="font-bold">Qual a entrada?</h3>
            {/* TODO: Improve input to reflect currency */}
            <input
              type="number"
              placeholder="Insira a entrada desejada"
              name="downPayment"
              onChange={handleDownPaymentValue}
              min={0}
              className="h-10 w-80 rounded border border-neutral-300 px-2 text-neutral-600 outline-none focus:ring-1 focus:ring-neutral-400"
            />
          </div>
        </div>
        <div className="flex min-h-full flex-col items-center justify-center">
          <button
            type="submit"
            className="flex h-10 w-40 items-center justify-center rounded-full bg-violet-600 px-16 py-2 font-bold text-white transition-all duration-200 hover:bg-violet-500 "
            disabled={isLoading}
          >
            {isLoading ? (
              <PiCircleNotch className="size-4 animate-spin text-white" />
            ) : (
              <>Simular</>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
