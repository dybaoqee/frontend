import * as colors from 'constants/colors'
import {mobileMedia} from 'constants/media'
import styled from 'styled-components'
import Text from '@emcasa/ui-dom/components/Text'

export default styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 30px auto 40px;
  max-width: 960px;

  div.description {
    box-sizing: border-box;
    width: calc(100% - 420px);
    margin: 0 20px 40px;
    max-width: 100%;
  }

  @media ${mobileMedia} {
    flex-direction: column;
    width: 100vw;

    div.description {
      width: calc(100vw - 40px);
    }
  }
`

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media ${mobileMedia} {
    margin: 0 auto;
  }
`

export const Title = Text.withComponent('h1')

export const SubTitle = Text.withComponent('h3')
