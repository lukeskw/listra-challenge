import { Vehicle } from '@/@types/vehicle'
import { SimulatedValuesComponent } from '@/components/simulatedValuesComponent'
import { SimulationComponent } from '@/components/simulationComponent'
import { SpecsComponent } from '@/components/specsComponent'
import { apiBaseURL } from '@/lib/api'

interface VehicleAPIReturn {
  data: Vehicle[]
}

// fetching here to use next's fetch api on the server side
async function getVehicles() {
  const response = await fetch(`${apiBaseURL}/api/vehicles`, {
    next: { revalidate: 60 },
  })

  const vehicles: VehicleAPIReturn = await response.json()

  return vehicles.data
}

export default async function Home() {
  const vehicles = await getVehicles()

  return (
    <section className="flex min-h-screen flex-col gap-12 p-3 lg:px-12 lg:py-8">
      <h1 className="after:content['']  relative text-2xl font-bold after:absolute after:-bottom-2 after:left-0 after:h-1 after:w-16 after:rounded-full after:bg-violet-600 xl:text-3.5xl">
        Simulação de Financiamento
      </h1>
      {/* form component? */}
      <SimulationComponent vehicles={vehicles} />
      <div className="flex flex-col justify-center gap-8 lg:mt-16 xl:mb-48 xl:flex-row ">
        {/* specs component? */}
        <SpecsComponent />
        {/* values component? */}
        <SimulatedValuesComponent />
      </div>
    </section>
  )
}
