export const getParagraphs = (text) => text.match(/^.*((\r\n|\n|\r)|$)/gm)
