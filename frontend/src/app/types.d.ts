interface BaseLocation {
  id: number
  title: string
}
interface Location extends BaseLocation {
  description: string
}

interface Locations {
  count: number
  next: string
  previous: string
  results: BaseLocation[]
}
interface BaseItem {
  id: number
  title: string
  category: string
  quantity: number
  expiration_date: string
  location: BaseLocation
  ttl: number
}
interface PayloadItem {
  id: number
  title: string
  category: string
  quantity: number
  expiration_date: string
  location: number
  ttl: number
}

interface Items {
  count: number
  next: string
  previous: string
  results: BaseItem[]
}

interface Choice {
  field: string
  values: string[] | number[] | boolean[]
}

interface LoginValues {
  email: string
  password: string
}
