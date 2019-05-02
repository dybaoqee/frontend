import {
  StyledCloseButton,
  CloseIcon
 } from './style'

const CloseButton = (props) =>
  <StyledCloseButton justIcon={props.justIcon} inline style={props.buttonStyle} onClick={props.onClick}>
    <CloseIcon
      name="times"
      size={18}
      style={props.iconStyle}
      color={props.color}
    />
  </StyledCloseButton>

export default CloseButton
