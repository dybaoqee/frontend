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
    padding-left: ${theme.space[4]};
    padding-right: ${theme.space[4]};
  }
`

export const Title = Text.withComponent('h2')
export const SubTitle = Text.withComponent('h3')

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
  padding: ${theme.space[1]};
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
  margin-left: ${theme.space[2]}px;
  margin-right: ${theme.space[2]}px;
  opacity: ${props => props.isLast ? '0' : '1'};
`

export const StepContainer = styled(Row)`
  @media (max-width: ${theme.breakpoints[0]}) {
    margin-top: ${theme.space[2]}px;
    margin-bottom: 70px;
  }
`

export const Steps = styled(Row)`
  min-height: 30vh;
`
