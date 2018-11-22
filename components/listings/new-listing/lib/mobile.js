import theme from '@emcasa/ui'

const MOBILE_BREAKPOINT_WIDTH = parseInt(theme.breakpoints[0])

const isMobile = () => {
  if (!process.browser) {
    return false
  }
  return screen.width <= MOBILE_BREAKPOINT_WIDTH
}

export {
  isMobile
}
