import styled from 'styled-components'
import {themeGet} from 'styled-system'
import Button from '@emcasa/ui-dom/components/Button'

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const FilterButton = styled(Button)`
  border: 1px solid ${themeGet('colors.pink')};
  color: ${({active}) => active ? themeGet('colors.white') : themeGet('colors.pink')};
  font-size: ${themeGet('fontSizes.1')}px;
  margin: ${themeGet('space.1')}px;
`

export {
  Overlay,
  FilterButton
}
