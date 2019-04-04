import Button from '@emcasa/ui-dom/components/Button'
import Icon from '@emcasa/ui-dom/components/Icon'

const CloseButton = (props) =>
  <Button onClick={props.onClick}>
    <Icon name="times" size={18} />
  </Button>

export default CloseButton
