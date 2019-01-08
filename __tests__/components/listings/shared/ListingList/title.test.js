import { getTitleText } from 'components/listings/shared/ListingList/title'

describe('Listing page title', () => {
  it('returns only the base title when nothing is passed', () => {
    const title = getTitleText()
    expect(title).toBe('Apartamentos e Casas à venda')
  })

  it('returns the title when state rj passed', () => {
    const state = 'rj'
    const title = getTitleText(state)
    expect(title).toBe('Apartamentos e Casas à venda na Zona Sul do Rio de Janeiro')
  })

  it('returns the title when state sp is passed', () => {
    const state = 'sp'
    const title = getTitleText(state)
    expect(title).toBe('Apartamentos e Casas à venda em São Paulo')
  })

  it('returns the title when a neighborhood is passed', () => {
    const state = 'rj'
    const neighborhood = 'ipanema'
    const title = getTitleText(state, neighborhood)
    expect(title).toBe('Apartamentos e Casas à venda em Ipanema')
  })
})
