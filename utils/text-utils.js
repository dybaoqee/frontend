import createNumberMask from 'text-mask-addons/dist/createNumberMask'

const getParagraphs = (text) => {
  if (text) {
    return text.match(/^.*((\r\n|\n|\r)|$)/gm)
  }
}

const getUrlVars = (url) => {
  const vars = {}
  url.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
    vars[key] = value
  })
  return vars
}

const currencyToInt = (displayPrice) => {
  const cleanPrice = displayPrice.replace(PREFIX, '').replace(THOUSANDS_SEPARATOR_SYMBOL, '')
  const intPrice = parseInt(cleanPrice)
  return intPrice
}

const intToCurrency = (value) => {
  const currencyValue = value.toLocaleString('pt-BR', currencyStyle)
  return currencyValue
}

const roundUpPrice = (price) => {
  const base = 10000
  return Math.trunc(price/base) * base
}

const currencyStyle = {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
}

const PREFIX = 'R$ '
const THOUSANDS_SEPARATOR_SYMBOL = '.'

const currencyInputMask = createNumberMask({
  prefix: PREFIX,
  thousandsSeparatorSymbol: THOUSANDS_SEPARATOR_SYMBOL,
  integerLimit: 12
})

export {
  getParagraphs,
  getUrlVars,
  currencyStyle,
  currencyInputMask,
  currencyToInt,
  intToCurrency,
  roundUpPrice,

  PREFIX,
  THOUSANDS_SEPARATOR_SYMBOL
}
