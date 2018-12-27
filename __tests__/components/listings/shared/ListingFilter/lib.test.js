import { activeFilters } from 'components/listings/shared/ListingFilter/lib'

describe('Listing Filter libs', () => {
  it('should return a list of empty active filters', () => {
    const values = {}
    expect(activeFilters(values)).toEqual([])
  })

  it('should return filter with types', () => {
    const values = {
      types: ['Apartameto']
    }
    expect(activeFilters(values)).toEqual([{'filter': 'types', 'value': 'Apartameto'}])
  })

  it('should return filter with multiple types', () => {
    const values = {
      types: ['Apartameto', 'Casa', 'Cobertura']
    }
    expect(activeFilters(values)).toEqual([{'filter': 'types', 'value': 'Apartameto, Casa, Cobertura'}])
  })

  it('should return filter with area range', () => {
    const values = {
      area: {min: 35, max: 100}
    }
    expect(activeFilters(values)).toEqual([{"filter": "area", "value": "35 - 100 m²"}])
  })

  it('should return filter with price range', () => {
    const values = {
      price: {min: 500000, max: 1000000}
    }
    expect(activeFilters(values)).toEqual([{"filter": "price", "value": "R$500.00k - R$1.00m"}])
  })

  it('should return filter with a single room', () => {
    const values = {
      rooms: {min: 1}
    }
    expect(activeFilters(values)).toEqual([{"filter": "rooms", "value": "1 quarto ou mais"}])
  })

  it('should return filter with rooms', () => {
    const values = {
      rooms: {min: 2}
    }
    expect(activeFilters(values)).toEqual([{"filter": "rooms", "value": "2 quartos ou mais"}])
  })

  it('should return filter with a single garage spot', () => {
    const values = {
      garageSpots: {min: 1}
    }
    expect(activeFilters(values)).toEqual([{"filter": "garageSpots", "value": "1 vaga ou mais"}])
  })

  it('should return filter with garage spots', () => {
    const values = {
      garageSpots: {min: 4}
    }
    expect(activeFilters(values)).toEqual([{"filter": "garageSpots", "value": "4 vagas ou mais"}])
  })

  it('should return filter with more than 5 rooms', () => {
    const values = {
      rooms: {min: 5}
    }
    expect(activeFilters(values)).toEqual([{"filter": "rooms", "value": "5 quartos ou mais"}])
  })

  it('should return filter with 5 or more garage spots', () => {
    const values = {
      garageSpots: {min: 5}
    }
    expect(activeFilters(values)).toEqual([{"filter": "garageSpots", "value": "5 vagas ou mais"}])
  })

  it('should return filter with all values included', () => {
    const values = {
      types: ['Apartameto', 'Casa', 'Cobertura'],
      area: {min: 50, max: 120},
      price: {min: 750000, max: 1500000},
      rooms: {min: 4},
      garageSpots: {min: 3}
    }
    expect(activeFilters(values)).toEqual([{"filter": "types", "value": "Apartameto, Casa, Cobertura"}, {"filter": "price", "value": "R$750.00k - R$1.50m"}, {"filter": "rooms", "value": "4 quartos ou mais"}, {"filter": "garageSpots", "value": "3 vagas ou mais"}, {"filter": "area", "value": "50 - 120 m²"}])
  })
})
