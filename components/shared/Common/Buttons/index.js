import Button from './styles'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
export default (props) => (
  <Button {...props}>
    {props.icon && <FontAwesomeIcon icon={props.icon} />}
    {props.children}
  </Button>
)
