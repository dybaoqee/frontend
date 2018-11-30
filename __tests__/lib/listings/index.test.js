import {
  getListingId,
  getListingSummary,
  plural
} from 'lib/listings'

describe('Listing', () => {
  it('should read the correct listing id from url', () => {
    const url = 'https://emcasa.com/imoveis/rj/rio-de-janeiro/copacabana/rua-5-de-julho/id-840'
    const id = getListingId(url)
    expect(id).toBe('840')
  })

  it('should read the correct listing id from legacy url', () => {
    const url = 'https://emcasa.com/imoveis/840'
    const id = getListingId(url)
    expect(id).toBe('840')
  })

  it('should return the correct plural given a number', () => {
    let item = 0
    expect(plural(item)).toBe('')
    item = 1
    expect(plural(item)).toBe('')
    item = 2
    expect(plural(item)).toBe('s')
  })

  it('should return a string with the listing summary', () => {
    const listing = {
      area: 500,
      bathrooms: 3,
      garage_spots: 2,
      rooms: 4
    }
    const listingSummary = getListingSummary(listing)
    expect(listingSummary).toBe('500m² - 4 quartos - 2 vagas')
  })
})

