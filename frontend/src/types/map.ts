export type Coordinate = [longitude: number, latitude: number]

export type MapFeatureProperties = {
  id: string
  name: string
  subtitle?: string
  description?: string
  color?: string
  demandScore?: number
}

export type LayerKey = 'existingLines' | 'existingStations' | 'demand' | 'candidates' | 'proposedLine'
