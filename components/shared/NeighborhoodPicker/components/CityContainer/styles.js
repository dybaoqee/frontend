import styled from 'styled-components'
import theme from '@emcasa/ui'
import Row from '@emcasa/ui-dom/components/Row'
import Button from '@emcasa/ui-dom/components/Button'

const CitiesWrapper = styled(Row)`
  position: absolute;
  flex-direction: column;
  width: ${({width}) => width}px;
  top: calc(${({top}) => top}px + 60px);
  left: ${({left}) => left}px;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.lightGrey};
  border-radius: 0 0 4px 4px;
  box-sizing: border-box;
  z-index: 1;

  @media (max-width: ${theme.breakpoints[0]}) {
    margin-bottom: ${theme.space[4]}px;
  }
`

const NeighborhoodButton = styled(Button)`
  :hover {
    border: 1px solid ${theme.colors.pink};

  }
`

const Separator = styled.hr`
  border: 0.5px solid ${theme.colors.lightGrey};
`

export {
  CitiesWrapper,
  NeighborhoodButton,
  Separator
}
