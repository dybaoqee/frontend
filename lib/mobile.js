import theme from '@emcasa/ui'

/**
 * @deprecated. This method ends up causing a difference between what is rendered on the server and what is rendered on
 * the client. We should replace this with <Mobile> and <Desktop> components.
 */
const isMobile = (width) => {
  if (!process.browser) {
    return false
  }
  return (width || window.innerWidth) <= parseInt(theme.breakpoints[1])
}

export {
  isMobile
}
