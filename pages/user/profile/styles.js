import styled from 'styled-components'
import theme from '@emcasa/ui'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'
import {Container} from 'components/listings/shared/ListingCard/styles'

export const PROFILE_TABWRAPPER_MAX_WIDTH = 970

export const TabWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: ${theme.space[5]}px auto;
  padding: 0 ${theme.space[4]}px;
  max-width: ${PROFILE_TABWRAPPER_MAX_WIDTH}px;
`

export const ProfileAvatar = styled(Row)`
  width: 100px;
  height: 100px;
  font-size: ${theme.fontSizes[4]}px;
  color: ${theme.colors.white};
  background-color: ${theme.colors.blue};
  border-radius: 100%;
`

export const InitialView = styled(Row)`
  width: 100%;
  margin: ${theme.space[5]}px auto ${theme.space[4]}px;
  max-width: 324px;

  ${ProfileAvatar} {
    margin: 0 auto ${theme.space[5]}px;
  }

  ${Text} {
    display: block;
    margin: ${theme.space[1]}px 0;
  }

  ${Text} + ${Button} {
    margin: ${theme.space[5]}px 0 ${theme.space[2]}px;
  }
`

export const FavoritesView = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${Math.round((PROFILE_TABWRAPPER_MAX_WIDTH / 3) - (theme.space[2] * 2))}px, 1fr));
  grid-column-gap: ${theme.space[2]}px;
  grid-row-gap: ${theme.space[2]}px;
  margin: ${theme.space[5]}px 0 0;

  ${Container} {
    margin: 0;
    width: 100%;
  }
`
