import Sniffr from 'sniffr'

const s = new Sniffr()

export default (typeof window !== 'undefined'
  ? s.sniff(window.navigator.userAgent)
  : undefined)
