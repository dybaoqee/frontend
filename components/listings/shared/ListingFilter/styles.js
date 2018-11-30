import styled from 'styled-components'
import {themeGet} from 'styled-system'
import * as colors from 'constants/colors'
import Button from '@emcasa/ui-dom/components/Button'

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #ff0000;
`

const FilterButton = styled(Button)`
  border: 1px solid ${themeGet('colors.pink')};
  color: ${({active}) => active ? themeGet('colors.white') : themeGet('colors.pink')};
  font-size: ${themeGet('fontSizes.1')}px;
  margin: ${themeGet('space.1')}px;
`

export {
  Container,
  Overlay,
  FilterButton
}
