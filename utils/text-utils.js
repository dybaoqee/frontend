import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import startCase from 'lodash/startCase'

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

const arrayToString = (arr) => {
  let str = ''
  for (let i = 0; i < arr.length; i++) {
    str += startCase(arr[i])
    if (i < arr.length - 1) {
      str += ', '
    }
  }
  return str
}

const currencyToInt = (displayPrice) => {
  const cleanPrice = displayPrice.replace(PREFIX, '').split(THOUSANDS_SEPARATOR_SYMBOL).join('')
  const intPrice = parseInt(cleanPrice)
  return intPrice
}

const intToCurrency = (val) =>
  Number(val || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })

const roundUpPrice = (price) => {
  const base = 10000
  return Math.ceil(price/base) * base
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
  arrayToString,

  PREFIX,
  THOUSANDS_SEPARATOR_SYMBOL
}
