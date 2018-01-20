function joinParam(param) {
  if (Array.isArray(param)) {
    return param.map(function(item) {
      return item.value;
    }).join('|')
  } else {
    return param
  }
}

export function treatParams(params) {
  return Object.keys(params).map(function(key) {
    if (key === 'areFiltersVisible') return null
    if (params[key] === undefined) return null

    const flattenedValue = joinParam(params[key])
    return (flattenedValue === '') ? null : `${key}=${flattenedValue}`
  }).filter(n => n).join('&')
}
