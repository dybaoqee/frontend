const BASE_TITLE = 'Apartamentos e Casas à venda'

function getTitleText(state, neighborhood) {
  let h1Content = `${BASE_TITLE}`
  if (neighborhood) {
    h1Content += ` em ${neighborhood.substring(0, 1).toUpperCase()}${neighborhood.substring(1, neighborhood.length)}`
  } else if (state && state === 'rj') {
    h1Content += ` na Zona Sul do Rio de Janeiro`
  } else if (state && state === 'sp') {
    h1Content += ` em São Paulo`
  }
  return h1Content
}

export {
  getTitleText
}
