import Container from './styles'
import {Close} from './styles'
import CloseButton from 'components/shared/CloseButton'

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
      {!hideClose && <CloseButton unstyled onClick={handleClose.bind(null, false)}>×</CloseButton>}
      {children}
    </div>
  </Container>
