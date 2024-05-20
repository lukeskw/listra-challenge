export interface Vehicle {
  id: string
  photoURL: string
  city: string
  brand: string
  model: string
  description: string
  year: number
  mileage: number
  transmission: string
  phone: string
  price: number
  created_at: string
  updated_at: string
}

export interface Installment {
  installment: number
  payment: number
}
