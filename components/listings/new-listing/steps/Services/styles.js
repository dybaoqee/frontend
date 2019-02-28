import styled from 'styled-components'
import theme from '@emcasa/ui'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCalendar from '@fortawesome/fontawesome-pro-regular/faCalendarAlt'
import View from '@emcasa/ui-dom/components/View'
import Button from '@emcasa/ui-dom/components/Button'
import Row from '@emcasa/ui-dom/components/Row'

const StyledSchedulingButton = styled(Button)`
  display: flex;
  text-align: left;
  flex-direction: row;
  justify-content: space-between;
`

const SchedulingButton = (props) => {
  const {children, ...otherProps} = props

  return (
    <StyledSchedulingButton {...otherProps}>
      {children}
      <View style={{color: theme.colors.dark}}>
        <FontAwesomeIcon icon={faCalendar} />
      </View>
    </StyledSchedulingButton>
  )
}

const VideoContainer = styled(Row)`
  justify-content: center;
  flex-wrap: wrap;

  @media screen and (max-width: ${theme.breakpoints[0]}) {
    align-items: center;
  }
`

export {
  SchedulingButton,
  VideoContainer
}
