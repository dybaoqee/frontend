import {
  getNewFiltersFromQuery,
  getNewFiltersFromFilters,
  getLocationFromPath
} from 'utils/filter-params'

describe('listing search filter functions', () => {
  it('parses query and params filters to filter state', () => {
    const query = {
      preco_minimo: 250000,
      preco_maximo: 1500000,
      area_minima: 35,
      area_maxima: 300,
      vagas_minimo: 2,
      vagas_maximo: 2,
      quartos_minimo: 3,
      quartos_maximo: 3,
      tipos: 'Apartamento|Casa'
    }
    const params = {
      state: 'rj',
      city: 'rio-de-janeiro',
      neighborhood: 'humaita'
    }
    const filters = getNewFiltersFromQuery(query, params)
    expect(filters).toEqual({"area": {"max": 300, "min": 35}, "citiesSlug": ["rio-de-janeiro"], "garageSpots": {"max": 2, "min": 2}, "neighborhoodsSlugs": ["humaita"], "price": {"max": 1500000, "min": 250000}, "rooms": {"max": 3, "min": 3}, "types": ["Apartamento", "Casa"]})
  })

  it('parses query with only one home type to filter state', () => {
    const query = {
      tipos: 'Apartamento'
    }
    const filters = getNewFiltersFromQuery(query)
    expect(filters).toEqual({"types": ["Apartamento"]})
  })

  it('parses user selected filters into query string', () => {
    const filters = {
      price: {
        min: 250000,
        max: 2500000
      },
      area: {
        min: 35,
        max: 150
      },
      garageSpots: {
        min: 2,
        max: 2
      },
      rooms: {
        min: 3,
        max: 3
      },
      neighborhoodsSlugs: ['botafogo'],
      citiesSlugs: ['rio-de-janeiro'],
      types: ['Apartamento', 'Cobertura']
    }
    const query = getNewFiltersFromFilters(filters)
    expect(query).toEqual({"maxArea": 150, "maxGarageSpots": 2, "maxPrice": 2500000, "maxRooms": 3, "minArea": 35, "minGarageSpots": 2, "minPrice": 250000, "minRooms": 3, "neighborhoodsSlugs": ["botafogo"], "types": ["Apartamento", "Cobertura"]})
  })

  it('parses url with location into a location object', () => {
    const asPath = '/imoveis/rj/rio-de-janeiro/humaita?tipos=Apartamento'
    const location = getLocationFromPath(asPath)
    expect(location).toEqual({city: 'rio-de-janeiro', neighborhood: 'humaita', state: 'rj'})
  })

  it('parses url with incomplete location into a location object', () => {
    const asPath = '/imoveis/rj/rio-de-janeiro?tipos=Apartamento'
    const location = getLocationFromPath(asPath)
    expect(location).toEqual({city: 'rio-de-janeiro', state: 'rj'})
  })
})
