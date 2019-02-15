import styled from 'styled-components'
import Text from '@emcasa/ui-dom/components/Text'
import theme from '@emcasa/ui'

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

  @media (max-width: ${theme.breakpoints[0]}) {
    flex-direction: column;
    width: 100vw;
    padding: 0 ${theme.space[4]}px 0 ${theme.space[4]}px;

    div.description {
      width: calc(100vw - 40px);
    }
  }
`

export const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: ${theme.breakpoints[0]}) {
    margin: 0 auto;
  }
`

export const Title = Text.withComponent('h1')

export const SubTitle = Text.withComponent('h3')

export const ListingDescription = styled.div`
  position: relative;
  margin: 0 ${theme.space[4]}px ${theme.space[4]}px 0;

  @media (max-width: ${theme.breakpoints[0]}) {
    ${({expanded}) => expanded ? `height: auto;` : `height: 400px; overflow: hidden;`}
    margin-right: 0;
  }
`
