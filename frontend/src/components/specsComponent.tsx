'use client'
import { useVehicle } from '@/contexts/vehicleContext'
import { apiBaseURL } from '@/lib/api'
import Image from 'next/image'
import { GiGearStickPattern } from 'react-icons/gi'
import { MdLocationOn, MdCalendarMonth, MdOutlineSpeed } from 'react-icons/md'

export function SpecsComponent() {
  const { vehicle } = useVehicle()
  if (!vehicle) return null

  return (
    <div className="rounded-lg border border-neutral-200 bg-white shadow">
      <div className="relative">
        <Image
          src={`${apiBaseURL}${vehicle.photoURL}`}
          alt=""
          width={300}
          height={190}
          className="w-full rounded-t-lg"
        />
        <div className="absolute bottom-4 flex items-center gap-2 rounded-r-full bg-white px-2 py-1">
          <MdLocationOn size={16} className="text-violet-600" />
          <span>{vehicle.city}</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <h3 className="text-xl font-bold">{`${vehicle.brand} ${vehicle.model}`}</h3>
        <h4 className="text-sm ">{vehicle.description}</h4>
        <div className="flex w-full justify-between gap-4 text-sm">
          <div className="flex items-center gap-1">
            <MdCalendarMonth size={16} />
            <span>{vehicle.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <MdOutlineSpeed size={16} />
            <span>{vehicle.mileage} Km</span>
          </div>
          <div className="flex items-center gap-1">
            <GiGearStickPattern size={16} />
            <span>{vehicle.transmission}</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(vehicle.price / 100)}
        </h2>
      </div>
    </div>
  )
}
