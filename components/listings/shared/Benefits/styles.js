import styled from 'styled-components'
import theme from 'config/theme'
import {breakpoint} from '@emcasa/ui/lib/styles'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Row from '@emcasa/ui-dom/components/Row'

export const Container = styled(View)`
  display: flex;
  justify-content: center;
`

export const Content = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1100px;
  @media ${breakpoint.down('tablet')} {
    padding-left: ${theme.space[4]}px;
    padding-right: ${theme.space[4]}px;
  }
`

export const CarouselWrapper = styled(Row)`
  > div {
    padding-bottom: ${theme.space[5] * 2}px;
    margin-bottom: ${theme.space[4]}px;
  }
`

export const BenefitCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  h2 {
    margin: 0;
  }
  @media ${breakpoint.down('tablet')} {
    padding-bottom: 0px;
  }
`

export const VideoContainer = styled(Row)`
  justify-content: center;
  flex-wrap: wrap;

  @media screen and ${breakpoint.down('tablet')} {
    align-items: center;
  }
`

export const Icon = styled.div`
  background-image: url('/static/svg-icons/${(props) => props.name}.svg');
  background-repeat: no-repeat;
  background-size: cover;
  width: 70px;
  height: 70px;
  margin-bottom: 30px;
`
