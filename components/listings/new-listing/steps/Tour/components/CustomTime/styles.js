import styled from 'styled-components'
import { themeGet } from 'styled-system'

import View from '@emcasa/ui-dom/components/View'
import Row from '@emcasa/ui-dom/components/Row'
import Bullet from 'components/listings/new-listing/shared/Bullet'

const StyledCustomTime = styled(Row)`
  display: flex;
  align-items: center;
  border: 1px solid ${({selected}) => selected ? themeGet('colors.pink') : themeGet('colors.lightGrey')};
  border-radius: ${themeGet('space.1')}px;
  cursor: ${({selected}) => selected ? 'default' : 'pointer'};
  padding-left: ${themeGet('space.2')}px;
  padding-right: ${themeGet('space.2')}px;
  min-height: 60px;
`

const StyledCustomTimeItem = styled(View)`
  margin-bottom: ${themeGet('space.2')}px;
`

const Title = styled(Row)`
  display: flex;
  align-items: center;
  margin-top: ${themeGet('space.2')}px;
  margin-bottom: ${themeGet('space.2')}px;
`

const StyledBullet = styled(Bullet)`
  position: relative;
  margin: 0;
  width: 18px;
  height: 18px;
`

export {
  Title,
  StyledBullet,
  StyledCustomTime,
  StyledCustomTimeItem
}
