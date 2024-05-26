export default interface PropertyPresented {
  id: number
  name: string
  description: string
  price: number
  location: string
  soldAt: string | undefined
  bathroomNumber: number
  bedroomNumber: number
  floorNumber: number
  buildingSurface: number
  landSurface: number
  createdAt: string
  updatedAt: string
  owner: {
    id: number
    name: string
    email: string
    phone: string | null
  }
}
