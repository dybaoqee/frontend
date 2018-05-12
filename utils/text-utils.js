export const getParagraphs = (text) => {
  if (text) {
    return text.match(/^.*((\r\n|\n|\r)|$)/gm)
  }
}
