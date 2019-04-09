import theme from '@emcasa/ui'

/**
 * This method can cause a difference between what is rendered on the server and what is rendered on
 * the client. Don't use it to conditionally change the component tree. Using it for conditional prop
 * values is safe.
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
