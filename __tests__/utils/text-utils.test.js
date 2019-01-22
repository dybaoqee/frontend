import {
  getParagraphs,
  currencyToInt,
  roundUpPrice,
  getUrlVars,
  arrayToString
} from 'utils/text-utils'

describe('currency formatting', () => {
  it('should transform currency display value into an integer', () =>{
    const displayValue = 'R$ 200.000'
    const intValue = currencyToInt(displayValue)
    expect(intValue).toBe(200000)
  })

  it('should round up a price value', () => {
    const price = 1234567
    const roundedPrice = roundUpPrice(price)
    expect(roundedPrice).toBe(1240000)
  })
})

describe('text utils', () => {
  it('should return an array of paragraphs from a string of text', () => {
    const text = 'One paragraph.\nTwo paragraphs.\nThree paragraphs.'
    expect(getParagraphs(text)[0]).toBe('One paragraph.\n')
    expect(getParagraphs(text)[1]).toBe('Two paragraphs.\n')
    expect(getParagraphs(text)[2]).toBe('Three paragraphs.')
  })

  it('should return undefined if no text is passed to getParagraphs', () => {
    const text = null
    expect(getParagraphs(text)).toBe(undefined)
  })

  it('should return url vars', () => {
    const url = 'https://emcasa.com/test?a=123&b=456'
    const urlVars = getUrlVars(url)
    expect(urlVars.a).toBe('123')
    expect(urlVars.b).toBe('456')
  })

  it('should transform an array of strings of one string into a text', () => {
    const arr = ['copacabana']
    const text = arrayToString(arr)
    expect(text).toBe('Copacabana')
  })

  it('should transform an array of strings into a text', () => {
    const arr = ['copacabana', 'ipanema', 'botafogo']
    const text = arrayToString(arr)
    expect(text).toBe('Copacabana, Ipanema, Botafogo')
  })
})
