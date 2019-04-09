import Icon from '@emcasa/ui-dom/components/Icon'
import Button from './style'

const CloseButton = (props) =>
  <Button inline unstyled={props.unstyled} onClick={props.onClick}>
    <Icon name="times" size={18} />
  </Button>

export default CloseButton
