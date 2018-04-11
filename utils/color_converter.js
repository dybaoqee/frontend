import _ from 'lodash'
export default (c, a) => {
  // RGBA to Hex
  if (Array.isArray(c) || (typeof c === 'string' && /,/.test(c))) {
    c = Array.isArray(c) ? c : c.replace(/[\sa-z\(\);]+/gi, '').split(',')
    c = c.map((s) =>
      window
        .parseInt(s)
        .toString(16)
        .replace(/^([a-z\d])$/i, '0$1')
    )

    return '#' + c[0] + c[1] + c[2]
  } else {
    // Hex to RGBA
    c = c.replace(/#/, '')
    c = c.length % 6 ? c.replace(/(.)(.)(.)/, '$1$1$2$2$3$3') : c
    c = window.parseInt(c, 16)

    a = window.parseFloat(a) || null

    const r = (c >> 16) & 255
    const g = (c >> 8) & 255
    const b = (c >> 0) & 255

    return `rgb${a ? 'a' : ''}(${_.join([r, g, b], ', ')})`
  }
}
