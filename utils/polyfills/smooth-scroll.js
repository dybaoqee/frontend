import ua from './user-agent'

async function loadPolyfill(force = false) {
  window.__forceSmoothScrollPolyfill__ = force
  const polyfill = await import('smoothscroll-polyfill')
  polyfill.polyfill()
}

// Browsers with partial/no support for smooth scrolling
const shouldLoadPolyfill = () =>
  ['ie', 'edge', 'safari'].indexOf(ua.browser.name) !== -1

export async function load() {
  if (shouldLoadPolyfill()) {
    return loadPolyfill(true)
  }
}
