import Sniffr from 'sniffr'

export default (typeof window !== 'undefined'
  ? Sniffr.sniff(window.navigator.userAgent)
  : undefined)
