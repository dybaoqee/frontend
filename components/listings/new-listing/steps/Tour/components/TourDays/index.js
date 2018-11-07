import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Text from '@emcasa/ui-dom/components/Text'
import Slider from '../Slider'

const MAX_DAYS_TO_DISPLAY = 3
const PREVIOUS = - 1
const NEXT = 1

class TourDays extends PureComponent {
  constructor(props) {
    super(props)
    this.changeDayPage = this.changeDayPage.bind(this)
  }

  state = {
    dayOffset: 0,
    day: null
  }

  componentDidMount() {
    const { initialDayOffset, initialDay } = this.props
    this.setState({
      dayOffset: initialDayOffset,
      day: initialDay
    })
  }

  componentWillReceiveProps(props) {
    if (props.initialDayOffset && props.initialDayOffset !== this.state.dayOffset) {
      this.setState({
        dayOffset: props.initialDayOffset
      })
    }
  }

  changeDayPage(direction) {
    const dayOffset = this.state.dayOffset + direction
    this.setState({
      dayOffset
    })
  }

  render() {
    const { dayOffset } = this.state
    const { tourDays, onDaySelected } = this.props
    let i = 0

    const previousDayDisabled = dayOffset === 0
    const nextDayDisabled = dayOffset === tourDays.length - MAX_DAYS_TO_DISPLAY || tourDays.length <= MAX_DAYS_TO_DISPLAY

    return (
      <Slider
        previousDisabled={previousDayDisabled}
        nextDisabled={nextDayDisabled}
        onPrevious={() => {this.changeDayPage(PREVIOUS)}}
        onNext={() => {this.changeDayPage(NEXT)}}
      >
        {tourDays.map((item) => {
          if (i < dayOffset) {
            i++
            return
          }
          if (i < MAX_DAYS_TO_DISPLAY + dayOffset) {
            i++
            return (
              <Slider.Button
                onClick={() => {
                  this.setState({
                    day: item.key
                  })
                  onDaySelected(item.key, dayOffset)
                }}
                key={item.key}
                selected={this.state.day === item.key}
                {...item} />
            )
          }
        })}
      </Slider>
    )
  }
}

TourDays.propTypes = {
  initialDayOffset: PropTypes.number.isRequired,
  day: PropTypes.number,
  tourDays: PropTypes.array.isRequired,
  onDaySelected: PropTypes.func.isRequired
}

export default TourDays
