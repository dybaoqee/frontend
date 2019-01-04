import {
  getActiveFilters,
  userHasSelectedType,
  getFilterLabel
} from 'components/listings/shared/ListingFilter/lib'
import { FILTERS } from 'components/listings/shared/ListingFilter/constants'

describe('getActiveFilters', () => {
  it('should return a list of empty active filters', () => {
    const values = {}
    expect(getActiveFilters(values)).toEqual([])
  })

  it('should return filter with types', () => {
    const values = {
      types: ['Apartameto']
    }
    expect(getActiveFilters(values)).toEqual([{'filter': 'types', 'value': 'Apartameto'}])
  })

  it('should return filter with multiple types', () => {
    const values = {
      types: ['Apartameto', 'Casa', 'Cobertura']
    }
    expect(getActiveFilters(values)).toEqual([{'filter': 'types', 'value': 'Apartameto, Casa, Cobertura'}])
  })

  it('should return filter with area range', () => {
    const values = {
      area: {min: 35, max: 100}
    }
    expect(getActiveFilters(values)).toEqual([{"filter": "area", "value": "35 - 100 m²"}])
  })

  it('should return filter with price range', () => {
    const values = {
      price: {min: 500000, max: 1000000}
    }
    expect(getActiveFilters(values)).toEqual([{"filter": "price", "value": "R$500.00k - R$1.00m"}])
  })

  it('should return filter with a single room', () => {
    const values = {
      rooms: {min: 1}
    }
    expect(getActiveFilters(values)).toEqual([{"filter": "rooms", "value": "1 quarto ou mais"}])
  })

  it('should return filter with rooms', () => {
    const values = {
      rooms: {min: 2}
    }
    expect(getActiveFilters(values)).toEqual([{"filter": "rooms", "value": "2 quartos ou mais"}])
  })

  it('should return filter with a single garage spot', () => {
    const values = {
      garageSpots: {min: 1}
    }
    expect(getActiveFilters(values)).toEqual([{"filter": "garageSpots", "value": "1 vaga ou mais"}])
  })

  it('should return filter with garage spots', () => {
    const values = {
      garageSpots: {min: 4}
    }
    expect(getActiveFilters(values)).toEqual([{"filter": "garageSpots", "value": "4 vagas ou mais"}])
  })

  it('should return filter with more than 5 rooms', () => {
    const values = {
      rooms: {min: 5}
    }
    expect(getActiveFilters(values)).toEqual([{"filter": "rooms", "value": "5 quartos ou mais"}])
  })

  it('should return filter with 5 or more garage spots', () => {
    const values = {
      garageSpots: {min: 5}
    }
    expect(getActiveFilters(values)).toEqual([{"filter": "garageSpots", "value": "5 vagas ou mais"}])
  })

  it('should return filter with all values included', () => {
    const values = {
      types: ['Apartameto', 'Casa', 'Cobertura'],
      area: {min: 50, max: 120},
      price: {min: 750000, max: 1500000},
      rooms: {min: 4},
      garageSpots: {min: 3}
    }
    expect(getActiveFilters(values)).toEqual([{"filter": "types", "value": "Apartameto, Casa, Cobertura"}, {"filter": "price", "value": "R$750.00k - R$1.50m"}, {"filter": "rooms", "value": "4 quartos ou mais"}, {"filter": "garageSpots", "value": "3 vagas ou mais"}, {"filter": "area", "value": "50 - 120 m²"}])
  })
})

describe('userHasSelectedType', () => {
  it('should return true when user has selected the passed home type', () => {
    const userFilters = {
      types: ['Apartamento']
    }
    expect(userHasSelectedType(userFilters, 'Apartamento')).toBe(true)
  })

  it('should return false when user has not selected the passed home type', () => {
    const userFilters = {
      types: ['Apartamento']
    }
    expect(userHasSelectedType(userFilters, 'Cobertura')).toBe(false)
  })

  it('should return false when user has not selected any home types', () => {
    const userFilters = {}
    expect(userHasSelectedType(userFilters, 'Casa')).toBe(false)
  })
})

describe('getFilterLabel', () => {
  it('should return the label of the type filter', () => {
    const userFilters = {
      types: ['Apartamento', 'Casa']
    }
    expect(getFilterLabel(userFilters, FILTERS.TYPES.code)).toBe('Apartamento, Casa')
  })

  it('should return the default label when no type filter has been selected', () => {
    const userFilters = {}
    expect(getFilterLabel(userFilters, FILTERS.TYPES.code)).toBe('Tipos de imóveis')
  })

  it('should return the label of the price filter', () => {
    const userFilters = {
      price: {
        min: 250000,
        max: 1500000
      }
    }
    expect(getFilterLabel(userFilters, FILTERS.PRICE.code)).toBe('R$250.00k - R$1.50m')
  })

  it('should return the label of the area filter', () => {
    const userFilters = {
      area: {
        min: 35,
        max: 250
      }
    }
    expect(getFilterLabel(userFilters, FILTERS.AREA.code)).toBe('35 - 250 m²')
  })

  it('should return the label of the bedroom filter', () => {
    const userFilters = {
      rooms: {
        min: 2
      }
    }
    expect(getFilterLabel(userFilters, FILTERS.ROOMS.code)).toBe('2 quartos ou mais')
  })

  it('should return the label of the garage spots filter', () => {
    const userFilters = {
      garageSpots: {
        min: 3
      }
    }
    expect(getFilterLabel(userFilters, FILTERS.GARAGE_SPOTS.code)).toBe('3 vagas ou mais')
  })
})