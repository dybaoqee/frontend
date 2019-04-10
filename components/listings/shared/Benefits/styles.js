import styled from 'styled-components'
import {breakpoint} from '@emcasa/ui/lib/styles'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
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
    padding-left: 20px;
    padding-right: 20px;
  }
`

export const SubTitle = styled(Text)

export const BenefitCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  ${SubTitle} {
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
