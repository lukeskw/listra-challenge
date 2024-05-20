import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ReactNode } from 'react'
import { VehicleProvider } from '@/contexts/vehicleContext'

export default function FinancingLayout({ children }: { children: ReactNode }) {
  return (
    <VehicleProvider>
      <main className="mx-auto flex min-h-screen w-full flex-col justify-between gap-4">
        <Header />
        {children}
        <Footer />
      </main>
    </VehicleProvider>
  )
}
