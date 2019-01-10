import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Rail,
  Thumb,
  RangeValues,
  Value,
  Bar,
  THUMB_SIZE
} from './styles'

const BORDERS = 10

class NewSlider extends Component {
  static defaultProps = {
    min: 1,
    max: 10,
    value: 5,
    valuesFormatter: (value) => value
  }

  constructor(props) {
    super(props)

    const {min, max} = props

    this.rail = React.createRef()
    this.minThumb = React.createRef()
    this.maxThumb = React.createRef()
    this.bar = React.createRef()
    this.thumbs = [this.minThumb, this.maxThumb]

    this.state = {
      values: {
        minValue: min,
        maxValue: max
      },
      minThumbOnTheFront: false
    }
  }

  componentDidUpdate(prevProps) {
    const {values: oldValues} = prevProps
    const {values, min, max} = this.props

    if (oldValues && !values) {
      this.setState({values: {minValue: min, maxValue: max}}, () => {
        this.moveSliderTo(max, this.maxThumb.current)
        this.moveSliderTo(min, this.minThumb.current)
      })
    }
  }

  moveSliderTo = (value, element, userClicked) => {
    const {min, max, isRange, onChange, valuesRounder} = this.props
    const {values: {minValue, maxValue}} = this.state

    const left = element.getAttribute('aria-label') === 'min'

    const width = THUMB_SIZE

    if (valuesRounder) {
      value = valuesRounder(value)
    }

    if (value > max) {
      value = max
    }

    if (value < min) {
      value = min
    }

    if (isRange && userClicked) {
      if (left && value > maxValue) {
        value = maxValue
      } else if (!left && value < minValue) {
        value = minValue
      }
    }

    let pos = Math.round(
      (value - min) * (this.railWidth - 1 * width) / (max - min)
    )

    pos -= isRange ? width / 2 : 0

    if (left) {
      element.style.left = pos + width / 2 + 'px'
    } else {
      element.style.left = pos + (isRange ? width : 0) + 'px'
    }

    if (isRange) {
      const minThumbPosition = parseInt(
        this.minThumb.current.style.left.replace('px', '')
      )
      const maxThumbPosition = parseInt(
        this.maxThumb.current.style.left.replace('px', '')
      )

      this.bar.current.style.left = `${minThumbPosition + width / 2}px`

      this.bar.current.style.width = `${maxThumbPosition - minThumbPosition}px`
    }

    const newValues = {
      ...this.state.values,
      [left ? 'minValue' : 'maxValue']: value
    }

    this.setState({values: newValues})

    onChange && !isRange && onChange(newValues, userClicked)
  }

  get railWidth() {
    return this.props.railWidth - BORDERS
  }

  handleMouseDown = (mouseDownEvent) => {
    const {min, max, onChange, isRange} = this.props
    const {target} = mouseDownEvent

    const handleMouseMove = (event) => {
      const isLeftThumb = target.getAttribute('aria-label') === 'min'
      const railOffsetX = this.rail.current.getBoundingClientRect().left
      const thumbWidth = isLeftThumb ? 0 : this.minThumb.current.getBoundingClientRect().width / 2
      var diffX = (event.touches ? event.touches[0].pageX : event.pageX) - thumbWidth - railOffsetX
      const newValue = min + parseInt((max - min) * diffX / this.railWidth)
      this.moveSliderTo(newValue, target, true)

      event.stopPropagation()
    }

    const handleMouseUp = () => {
      const {values} = this.state
      onChange && isRange && onChange(values, true)
      document.removeEventListener('touchmove', handleMouseMove)
      document.removeEventListener('touchend', handleMouseUp)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    if (target === this.minThumb.current || target === this.maxThumb.current) {
      this.setState({
        used: true,
        minThumbOnTheFront: target === this.minThumb.current
      })
      document.addEventListener('touchmove', handleMouseMove)
      document.addEventListener('touchend', handleMouseUp)
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    mouseDownEvent.preventDefault()
  }

  componentDidMount() {
    const {isRange, min, max, values} = this.props
    this.thumbs.filter((thumb) => thumb.current).forEach((thumb) => {
      thumb.current.addEventListener('touchstart', this.handleMouseDown)
      thumb.current.addEventListener('mousedown', this.handleMouseDown)
    })

    if (isRange && values) {
      this.setState(
        {values: {minValue: values.min, maxValue: values.max}},
        () => {
          this.moveSliderTo(values.max, this.maxThumb.current)
          this.moveSliderTo(values.min, this.minThumb.current)
        }
      )
    } else if (isRange && !values) {
      this.moveSliderTo(max, this.maxThumb.current)
      this.moveSliderTo(min, this.minThumb.current)
    } else {
      this.moveSliderTo(max / 2, this.maxThumb.current)
    }
  }
  render() {
    const {
      isRange,
      showValue,
      valuesFormatter,
      min,
      max
    } = this.props

    const {values: {minValue, maxValue}, minThumbOnTheFront} = this.state
    return (
      <Container>
        {isRange && (
          <RangeValues>
            <Value>${valuesFormatter(minValue)}</Value>
            <Value>${valuesFormatter(maxValue)}</Value>
          </RangeValues>
        )}
        <Rail
          innerRef={this.rail}
          showValues={showValue}
          min={valuesFormatter(min)}
          max={valuesFormatter(max)}
        >
          {isRange && <Bar innerRef={this.bar} />}
          {isRange && (
            <Thumb aria-label="min" innerRef={this.minThumb} tabIndex="0" isOnTheFront={minThumbOnTheFront} />
          )}
          <Thumb aria-label="max" innerRef={this.maxThumb} tabIndex="0" isOnTheFront={!minThumbOnTheFront} />
        </Rail>
      </Container>
    )
  }
}

NewSlider.propTypes = {
  railWidth: PropTypes.number,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  values: PropTypes.object,
  isRange: PropTypes.bool,
  onChange: PropTypes.func,
  valuesFormatter: PropTypes.func,
  valuesRounder: PropTypes.func
}

export default NewSlider
