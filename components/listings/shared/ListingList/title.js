const BASE_TITLE = 'Apartamentos e Casas à venda'

function getTitleText({citiesSlug, neighborhoods}) {
  let h1Content = `${BASE_TITLE}`
  if (neighborhoods) {
    return h1Content
  } else if (citiesSlug && citiesSlug.includes('rio-de-janeiro')) {
    h1Content += ` na Zona Sul do Rio de Janeiro`
  } else if (citiesSlug && citiesSlug.includes('sao-paulo')) {
    h1Content += ` em São Paulo`
  }
  return h1Content
}

export {
  getTitleText
}
