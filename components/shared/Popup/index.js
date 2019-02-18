import Container from './styles'
import {Close} from './styles'

export default ({handleClose, children, hideClose, ...props}) =>
  <Container
    {...props}
    onClick={(e) => {
      if (e.target == e.currentTarget) {
        handleClose.call(null, false)
      }
    }}
  >
    <div>
      {!hideClose && <Close onClick={handleClose.bind(null, false)}>×</Close>}
      {children}
    </div>
  </Container>
