import {
  addNeighborhoodsToQuery
} from 'utils/filter-params'

describe('neighborhoodsToQuery', () => {
  it('adds neighborhoods to filters', () => {
    const filters = {}
    const selectedNeighborhoods = ['ipanema', 'copacabana']
    const query = addNeighborhoodsToQuery(filters, selectedNeighborhoods)
    expect(query).toBe('?bairros=ipanema|copacabana')
  })

  it('adds neighborhoods to existing filters', () => {
    const filters = {rooms: {min: 2}}
    const selectedNeighborhoods = ['ipanema', 'copacabana']
    const query = addNeighborhoodsToQuery(filters, selectedNeighborhoods)
    expect(query).toBe('?quartos_minimo=2&bairros=ipanema|copacabana')
  })

  it('adds neighborhoods to filters when there are two or more filters', () => {
    const filters = {rooms: {min: 2}, types: ['Apartamento', 'Casa']}
    const selectedNeighborhoods = ['ipanema', 'copacabana']
    const query = addNeighborhoodsToQuery(filters, selectedNeighborhoods)
    expect(query).toBe('?quartos_minimo=2&bairros=ipanema|copacabana&tipos=Apartamento|Casa')
  })

  it('adds neighborhoods to filters when theres already a neighborhood selected', () => {
    const filters = {neighborhoods: ['botafogo']}
    const selectedNeighborhoods = ['ipanema', 'copacabana']
    const query = addNeighborhoodsToQuery(filters, selectedNeighborhoods)
    expect(query).toBe('?bairros=ipanema|copacabana')
  })

  it('adds neighborhoods to filters when theres already a neighborhood selected, among other filters', () => {
    const filters = {rooms: {min: 2}, types: ['Apartamento', 'Casa'], neighborhoods: ['botafogo', 'leblon']}
    const selectedNeighborhoods = ['ipanema', 'copacabana']
    const query = addNeighborhoodsToQuery(filters, selectedNeighborhoods)
    expect(query).toBe('?quartos_minimo=2&bairros=ipanema|copacabana&tipos=Apartamento|Casa')
  })
})
