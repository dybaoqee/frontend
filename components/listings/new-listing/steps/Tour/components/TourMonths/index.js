import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Text from '@emcasa/ui-dom/components/Text'
import Slider from '../Slider'

const MAX_MONTHS_TO_DISPLAY = 1
const PREVIOUS = - 1
const NEXT = 1

class TourMonths extends PureComponent {
  constructor(props) {
    super(props)
    this.changeMonth = this.changeMonth.bind(this)
  }

  state = {
    monthOffset: 0
  }

  componentDidMount() {
    const { initialMonthOffset } = this.props
    this.setState({
      monthOffset: initialMonthOffset
    })
  }

  changeMonth(direction) {
    const { tourMonths, onMonthChanged } = this.props
    const monthOffset = this.state.monthOffset + direction
    this.setState({
      monthOffset
    })
    const month = tourMonths[monthOffset].date.getMonth()
    onMonthChanged(month, monthOffset)
  }

  render() {
    const { monthOffset } = this.state
    const { tourMonths } = this.props
    let i = 0

    const previousMonthDisabled = monthOffset === 0
    const nextMonthDisabled = monthOffset === tourMonths.length - MAX_MONTHS_TO_DISPLAY

    return (
      <Slider
        previousDisabled={previousMonthDisabled}
        nextDisabled={nextMonthDisabled}
        onPrevious={() => {this.changeMonth(PREVIOUS)}}
        onNext={() => {this.changeMonth(NEXT)}}
      >
        {tourMonths.map((item) => {
          if (i < monthOffset) {
            i++
            return
          }
          if (i < MAX_MONTHS_TO_DISPLAY + monthOffset) {
            i++
            return (
              <Text
                key={item.key}
                data={item}
                noBorder
              >
                {item.display}
              </Text>
            )
          }
        })}
      </Slider>
    )
  }
}

TourMonths.propTypes = {
  initialMonthOffset: PropTypes.number,
  tourMonths: PropTypes.array.isRequired,
  onMonthChanged: PropTypes.func.isRequired
}

TourMonths.defaultProps = {
  initialMonthOffset: 0
}

export default TourMonths
