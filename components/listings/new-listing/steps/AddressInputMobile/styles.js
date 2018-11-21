import styled from 'styled-components'
import { themeGet } from 'styled-system'
import Row from '@emcasa/ui-dom/components/Row'

const MobieTypeaheadContainer = styled(Row)`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 5;
  background-color: ${themeGet('colors.white')};
`

export {
  MobieTypeaheadContainer
}
