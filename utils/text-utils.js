export const getParagraphs = (text) => {
  if (text) {
    return text.match(/^.*((\r\n|\n|\r)|$)/gm)
  }
}

export const getUrlVars = (url) => {
  const vars = {}
  url.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
    vars[key] = value
  })
  return vars
}
