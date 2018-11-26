import {isMobile} from 'lib/mobile'

const autoFocus = (ref) => {
  if (ref && !isMobile()) {
    ref.focus()
  }
}

export {
  autoFocus
}
