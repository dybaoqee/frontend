import styled from 'styled-components'
import theme from '@emcasa/ui'
import Icon from '@emcasa/ui-dom/components/Icon'

const CloseButtonContainer = styled.div`
  cursor: pointer;
  display: flex;
  position: absolute;
  top: ${theme.space[2]}px;
  right: ${theme.space[2]}px;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  border: none;
  width: 40px;
  height: 40px;
  margin: 0;
  padding: 0;
`

const CloseIcon = styled(Icon)`
  padding-top: 6px;
`

const CloseButton = (props) =>
  <CloseButtonContainer onClick={props.onClick}>
    <CloseIcon name="times" color={theme.colors.dark} size={18} />
  </CloseButtonContainer>

export default CloseButton
