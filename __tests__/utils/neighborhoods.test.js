import {
  addNeighborhoodsToQuery
} from 'utils/filter-params'

describe('neighborhoodsToQuery', () => {
  it('adds selected neighborhoods to empty search query', () => {
    const search = ''
    const selectedNeighborhoods = ['ipanema', 'copacabana']
    const query = addNeighborhoodsToQuery(search, selectedNeighborhoods)
    expect(query).toBe('?bairros=ipanema|copacabana')
  })

  it('adds selected neighborhoods to an already existing search query', () => {
    const search = '?tipos=Apartamento'
    const selectedNeighborhoods = ['ipanema', 'copacabana']
    const query = addNeighborhoodsToQuery(search, selectedNeighborhoods)
    expect(query).toBe('?tipos=Apartamento&bairros=ipanema|copacabana')
  })

  it('adds selected neighborhoods to a search query with two or more filters', () => {
    const search = '?quartos_minimo=2&tipos=Apartamento'
    const selectedNeighborhoods = ['ipanema', 'copacabana']
    const query = addNeighborhoodsToQuery(search, selectedNeighborhoods)
    expect(query).toBe('?quartos_minimo=2&tipos=Apartamento&bairros=ipanema|copacabana')
  })

  it('adds selected neighborhoods to a search query which already has neighborhoods in it', () => {
    const search = '?bairros=botafogo'
    const selectedNeighborhoods = ['ipanema', 'copacabana']
    const query = addNeighborhoodsToQuery(search, selectedNeighborhoods)
    expect(query).toBe('?bairros=botafogo|ipanema|copacabana')
  })

  it('adds selected neighborhoods to a search query which already has neighborhoods and other filters in it', () => {
    const search = '?bairros=botafogo&tipos=Apartamento'
    const selectedNeighborhoods = ['ipanema', 'copacabana']
    const query = addNeighborhoodsToQuery(search, selectedNeighborhoods)
    expect(query).toBe('?tipos=Apartamento&bairros=botafogo|ipanema|copacabana')
  })
})
