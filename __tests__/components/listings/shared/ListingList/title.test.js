import { getTitleText } from 'components/listings/shared/ListingList/title'

describe('Listing page title', () => {
  it('returns only the base title when filter has neighborhoods', () => {
    const filters = {
      neighborhoods: ['copacabana']
    }
    const title = getTitleText(filters)
    expect(title).toBe('Apartamentos e Casas à venda')
  })

  it('returns the title when city slug rio-de-janeiro is passed', () => {
    const filters = {
      citiesSlug: ['rio-de-janeiro']
    }
    const title = getTitleText(filters)
    expect(title).toBe('Apartamentos e Casas à venda na Zona Sul do Rio de Janeiro')
  })

  it('returns the title when city slug sao-paulo is passed', () => {
    const filters = {
      citiesSlug: ['sao-paulo']
    }
    const title = getTitleText(filters)
    expect(title).toBe('Apartamentos e Casas à venda em São Paulo')
  })
})
