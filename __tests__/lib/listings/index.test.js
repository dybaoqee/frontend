import {getListingId} from 'lib/listings'

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
})
