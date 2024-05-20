'use client'
import { useVehicle } from '@/contexts/vehicleContext'
import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa6'

export function SimulatedValuesComponent() {
  const { vehicle, simulation } = useVehicle()
  if (!vehicle) return null
  if (simulation && simulation?.length === 0)
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-8 rounded bg-white p-8 shadow-sm ">
        <h1 className="text-center text-xl font-bold">
          Clique em simular para fazer uma simulação!
        </h1>
      </div>
    )

  return (
    <div className="flex flex-1 flex-col gap-8 rounded bg-white p-8 shadow-sm ">
      <h3 className="after:content[''] relative text-xl font-bold after:absolute after:-bottom-2 after:left-0 after:h-1 after:w-12 after:rounded-full after:bg-violet-600">
        Valores simulados para você
      </h3>
      <div className="flex w-full flex-col gap-2 font-bold lg:w-96">
        <div className="relative flex-1 rounded-xl border border-neutral-200 p-4 shadow">
          <h5 className="">{simulation[0].installment}x</h5>
          <h4 className="text-2xl text-violet-700">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(simulation[0].payment / 100)}
          </h4>
          <div className="absolute right-0 top-0 flex translate-y-full items-center gap-2 rounded-l-full bg-violet-600 px-2 py-1 text-white">
            <span className="text-sm font-normal">IPVA GRÁTIS</span>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 xl:flex-row">
          <div className="flex w-full flex-col rounded-xl border border-neutral-200 p-4 shadow">
            <h5>{simulation[1].installment}x</h5>
            <h4 className="text-2xl text-violet-700">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(simulation[1].payment / 100)}
            </h4>
          </div>
          <div className="flex w-full flex-col rounded-xl border border-neutral-200 p-4 shadow">
            <h5>{simulation[2].installment}x</h5>
            <h4 className="text-2xl text-violet-700">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(simulation[2].payment / 100)}
            </h4>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 font-bold xl:flex-row">
        <Link
          href="/"
          className="flex w-64 items-center justify-center gap-2 rounded-full bg-green-600/90 px-6 py-2 text-white transition-all duration-200 hover:bg-green-600/80"
        >
          <FaWhatsapp size={24} />
          <span className="font-bold">Falar com consultor</span>
        </Link>
        <span>{vehicle.phone}</span>
      </div>
    </div>
  )
}
