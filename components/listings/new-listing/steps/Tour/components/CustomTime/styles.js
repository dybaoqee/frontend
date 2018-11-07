import styled from 'styled-components'
import { themeGet } from 'styled-system'

import View from '@emcasa/ui-dom/components/View'
import Row from '@emcasa/ui-dom/components/Row'

const StyledCustomTime = styled(View)`
  border: 1px solid ${({selected}) => selected ? themeGet('colors.pink') : themeGet('colors.lightGrey')};
  border-radius: ${themeGet('space.1')}px;
  cursor: ${({selected}) => selected ? 'default' : 'pointer'};
  padding-top: ${themeGet('space.3')}px;
  padding-left: ${themeGet('space.2')}px;
  padding-right: ${themeGet('space.2')}px;
`

const StyledCustomTimeItem = styled(View)`
  margin-bottom: ${themeGet('space.2')}px;
`

const Title = styled(Row)`
  display: flex;
  align-items: center;
  margin-bottom: ${themeGet('space.2')}px;
`

export {
  Title,
  StyledCustomTime,
  StyledCustomTimeItem
}
