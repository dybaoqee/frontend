import styled from 'styled-components'
import theme from 'config/theme'
import Text from '@emcasa/ui-dom/components/Text'
import View from '@emcasa/ui-dom/components/View'
import {breakpoint} from '@emcasa/ui/lib/styles'

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

  @media ${breakpoint.down('tablet')} {
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

  @media ${breakpoint.down('tablet')} {
    margin: 0;
  }
`

export const MobileInfo = styled(View)`
  display: none;
  padding: ${theme.space[4]}px 0 ${theme.space[4]}px 0;
  width: 100%;
  border: 1px solid ${theme.colors.lightGrey};
  border-radius: 4px;
  box-shadow: 0 6px 16px 0 rgba(38, 38, 38, 0.15);

  @media ${breakpoint.down('tablet')} {
    display: block;
  }
`

export const Title = Text.withComponent('h2')

export const SubTitle = Text.withComponent('h3')

export const ListingDescription = styled.div`
  position: relative;
  margin: 0 ${theme.space[4]}px ${theme.space[4]}px 0;

  @media ${breakpoint.down('tablet')} {
    ${({expanded}) => expanded ? `height: auto;` : `height: 400px; overflow: hidden;`}
    margin-right: 0;
  }
`
