import styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faAngleRight from '@fortawesome/fontawesome-pro-regular/faAngleRight'
import faAngleLeft from '@fortawesome/fontawesome-pro-regular/faAngleLeft'
import theme from '@emcasa/ui'
import Button from '@emcasa/ui-dom/components/Button'

const LeftArrow = () => <FontAwesomeIcon icon={faAngleLeft} />
const RightArrow = () => <FontAwesomeIcon icon={faAngleRight} />

const StyledButton = styled(Button)`
  z-index: 3;
  position: absolute;
  top: calc(50% - ${theme.space[2]}px);
  ${({left}) => (!left ? `right: 0` : `left: 0`)};
  color: ${({color}) => color ? color : `white`};
  cursor: pointer;
  padding: 0;
  background: 0;
  border: 0;

  &:hover {
    svg {
      background: 0;
    }
  }

  svg {
    width: 40px !important;
    height: 40px;
    ${({noShadow}) => !noShadow ? `filter: drop-shadow(1px 1px 4px ${theme.colors.dark});` : null}
  }
`

export default (props) => (
  <StyledButton {...props}>
    {props.left ? <LeftArrow /> : <RightArrow />}
  </StyledButton>
)
