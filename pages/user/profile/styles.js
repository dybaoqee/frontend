import styled from 'styled-components'
import {themeGet} from 'styled-system'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'
import {Container} from 'components/listings/shared/ListingCard/styles'

const PROFILE_GRID_MEDIAQUERY = 'only screen and (max-width: 1024px)'
export const PROFILE_TABWRAPPER_MAX_WIDTH = 710
export const PROFILE_INITIALVIEW_MAX_WIDTH = 414

export const ProfileAvatar = styled(Row)`
  width: 100px;
  height: 100px;
  font-size: ${themeGet('fontSizes.4')}px;
  color: ${themeGet('colors.white')};
  background-color: ${themeGet('colors.blue')};
  border-radius: 100%;
`

export const Icon = styled.div`
  background-image: url(${(props) => props.icon});
  background-repeat: no-repeat;
  background-size: cover;
  width: 70px;
  height: 70px;
`

export const TabWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: ${themeGet('space.5')}px auto;
  padding: 0 ${themeGet('space.4')}px;
  max-width: ${PROFILE_TABWRAPPER_MAX_WIDTH}px;
`

export const InitialView = styled(Row)`
  width: 100%;
  margin: ${themeGet('space.6')}px auto ${themeGet('space.4')}px;
  max-width: ${({maxWidth}) =>
    maxWidth ? maxWidth : `${PROFILE_INITIALVIEW_MAX_WIDTH}px`};

  ${ProfileAvatar} {
    margin: 0 auto ${themeGet('space.5')}px;
  }

  ${Text} {
    display: block;
    margin: ${themeGet('space.1')}px 0;
  }

  ${Text} + ${Button} {
    margin: ${themeGet('space.5')}px 0 ${themeGet('space.2')}px;
  }
`

export const ProfileList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-column-gap: ${themeGet('space.2')}px;
  grid-row-gap: ${themeGet('space.2')}px;
  margin: ${themeGet('space.5')}px 0 0;

  @media ${PROFILE_GRID_MEDIAQUERY} {
    grid-template-columns: repeat(
      auto-fill,
      minmax(
        ${(props) => {
          Math.round(
            PROFILE_TABWRAPPER_MAX_WIDTH / 3 - themeGet('space.2')(props) * 2
          )
        }}px,
        1fr
      )
    );
  }

  ${Container} {
    margin: 0;
    width: 100%;
  }
`
