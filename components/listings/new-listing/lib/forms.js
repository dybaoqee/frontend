import {isMobile} from './mobile'

const autoFocus = (ref) => {
  if (ref && !isMobile()) {
    ref.focus()
  }
}

export {
  autoFocus
}
