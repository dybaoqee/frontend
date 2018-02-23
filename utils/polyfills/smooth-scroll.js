import ua from './user-agent'

const loadPolyfill = (force = false) => {
  window.__forceSmoothScrollPolyfill__ = force
  import('smoothscroll-polyfill').polyfill()
}

const shouldLoadPolyfill = () =>
  ['ie', 'safari'].indexOf(ua.browser.name) !== -1

export default () => {
  if (shouldLoadPolyfill) {
    loadPolyfill(true)
  }
}
