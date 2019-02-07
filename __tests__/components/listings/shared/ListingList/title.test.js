import {
  BUY_TITLE_BASE,
  BUY_TITLE_DEFAULT_END,
  BUY_TITLE_FILTER_PREPOSITION,
  BUY_TITLE_NEIGHBORHOOD_PREPOSITION,
  BUY_TITLE_CITY_PREPOSITION,
  BUY_TITLE_STATE_PREPOSITION,
  NEIGHBORHOODS,
  CITIES,
  STATES,
  CUSTOM_BUY_TITLE,
  getTitleTextByFilters,
  getTitleTextByParams
} from 'components/listings/shared/ListingList/title'

describe('Listing page title', () => {
  it('returns the base title', () => {
    const params = []
    const title = getTitleTextByParams(params)
    expect(title).toBe(`${BUY_TITLE_BASE} ${BUY_TITLE_DEFAULT_END}`)
  })

  it('returns the title with neighborhood name when filter has just one neighborhood', () => {
    const filters = {
      neighborhoodsSlug: ['jardim-botanico']
    }
    const title = getTitleTextByFilters(filters.neighborhoodsSlug)

    const {stateValue, cityValue, neighborhoodValue} = NEIGHBORHOODS.find(value => value.neighborhood === filters.neighborhoodsSlug[0])

    expect(title).toBe(`${BUY_TITLE_BASE} ${BUY_TITLE_NEIGHBORHOOD_PREPOSITION} ${neighborhoodValue}, ${cityValue} - ${stateValue}`)
  })

  it('returns the base title when filter has more than one neighborhood', () => {
    const filters = {
      neighborhoodsSlugs: ['copacabana', 'perdizes']
    }
    const title = getTitleTextByFilters(filters.neighborhoodsSlugs)
    expect(title).toBe(`${BUY_TITLE_BASE} ${BUY_TITLE_DEFAULT_END}`)
  })

  it('returns the state title when params has just state', () => {
    const params = {
      state: 'rj'
    }
    const title = getTitleTextByParams(params)
    const {stateValue} = STATES.find(value => value.state === params.state)
    expect(title).toBe(`${BUY_TITLE_BASE} ${BUY_TITLE_STATE_PREPOSITION} ${stateValue}`)
  })

  it('returns the city title when there\'s no neighborhood in params', () => {
    const params = {
      state: 'sp',
      city: 'sao-paulo'
    }
    const title = getTitleTextByParams(params)

    const {stateValue, cityValue} = CITIES.find(value => value.city === params.city)
    expect(title).toBe(`${BUY_TITLE_BASE} ${BUY_TITLE_CITY_PREPOSITION} ${cityValue} - ${stateValue}`)
  })

  it('returns the neighbourhood title', () => {
    const params = {
      state: 'rj',
      city: 'rio-de-janeiro',
      neighborhood: 'jardim-botanico'
    }
    const title = getTitleTextByParams(params)

    const {stateValue, cityValue, neighborhoodValue} = NEIGHBORHOODS.find(value => value.neighborhood === params.neighborhood)
    expect(title).toBe(`${BUY_TITLE_BASE} ${BUY_TITLE_NEIGHBORHOOD_PREPOSITION} ${neighborhoodValue}, ${cityValue} - ${stateValue}`)
  })

  it('returns the custom title', () => {
    const params = {
      state: 'rj',
      city: 'rio-de-janeiro'
    }
    const title = getTitleTextByParams(params)
    const custom = CUSTOM_BUY_TITLE.find(title => title.city === params.city)
    expect(title).toBe(`${BUY_TITLE_BASE} ${custom.value}`)
  })
})
