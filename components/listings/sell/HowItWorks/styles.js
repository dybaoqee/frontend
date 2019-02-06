import theme from '@emcasa/ui'
import styled from 'styled-components'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
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
  @media (max-width: ${theme.breakpoints[0]}) {
    padding-left: 20px;
    padding-right: 20px;
  }
`

export const Title = Text.withComponent('h2')

export const Icon = styled.div`
  background-image: url('/static/svg-icons/${props => props.name}.svg');
  background-repeat: no-repeat;
  background-size: cover;
  width: 70px;
  height: 70px;
`

export const Step = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  border: 1px solid ${theme.colors.lightGrey};
  border-radius: 4px;
  width: 120px;
  height: 164px;
  padding: 5px;
  p {
    margin: 0;
  }
`

export const StepIndex = styled.div`
  margin-top: -10px;
  margin-left: -60px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  width: 28px;
  border-radius: 100%;
  background-color: ${theme.colors.pink};
`

export const StepArrow = styled.div`
  background: url('/static/assets/arrow-seller.svg') no-repeat;
  background-size: contain;
  background-position: center center;
  width: 70px;
  margin-left: 10px;
  margin-right: 10px;
  opacity: ${props => props.isLast ? '0' : '1'};
`

export const StepContainer = styled(Row)`
  @media (max-width: ${theme.breakpoints[0]}) {
    margin-top: 10px;
    margin-bottom: 70px;
  }
`

export const Steps = styled(Row)`
  min-height: 30vh;
`
