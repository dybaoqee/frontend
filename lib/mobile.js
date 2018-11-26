import theme from '@emcasa/ui'

const MOBILE_BREAKPOINT_WIDTH = parseInt(theme.breakpoints[0])

const isMobile = (width) => {
  if (!process.browser) {
    return false
  }
  return (width || window.innerWidth) <= MOBILE_BREAKPOINT_WIDTH
}

export {
  isMobile
}
