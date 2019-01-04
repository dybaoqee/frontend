import theme from '@emcasa/ui'

const MOBILE_BREAKPOINT_WIDTH = parseInt(theme.breakpoints[0])

/**
 * @deprecated. This method ends up causing a difference between what is rendered on the server and what is rendered on
 * the client. We should replace this with <Mobile> and <Desktop> components.
 */
const isMobile = (width) => {
  if (!process.browser) {
    return false
  }
  return (width || window.innerWidth) <= MOBILE_BREAKPOINT_WIDTH
}

export {
  isMobile
}
