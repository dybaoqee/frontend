import theme from '@emcasa/ui'

const MOBILE_BREAKPOINT_WIDTH = parseInt(theme.breakpoints[0])

const isMobile = () => {
  return window.innerWidth <= MOBILE_BREAKPOINT_WIDTH
}

export {
  isMobile
}
