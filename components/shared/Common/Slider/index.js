import React, {Component} from 'react'
import Container, {Rail, Thumb, Tip, Tutorial, Icon} from './styles'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faAngleRight from '@fortawesome/fontawesome-pro-regular/faAngleRight'
import faAngleLeft from '@fortawesome/fontawesome-pro-regular/faAngleLeft'

export default class Slider extends Component {
  static defaultProps = {
    min: 1,
    max: 10,
    value: 5
  }

  constructor(props) {
    super(props)

    this.rail = React.createRef()
    this.minThumb = React.createRef()
    this.maxThumb = React.createRef()
    this.thumbs = [this.minThumb, this.maxThumb]

    this.railBorderWidth = 1

    this.keyCode = Object.freeze({
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      pageUp: 33,
      pageDown: 34,
      end: 35,
      home: 36
    })
  }
  handleKeyDown = (event) => {
    var flag = false

    switch (event.keyCode) {
      case this.keyCode.left:
      case this.keyCode.down:
        this.moveSliderTo(this.valueNow - 1)
        flag = true
        break

      case this.keyCode.right:
      case this.keyCode.up:
        this.moveSliderTo(this.valueNow + 1)
        flag = true
        break

      case this.keyCode.pageDown:
        this.moveSliderTo(this.valueNow - 10)
        flag = true
        break

      case this.keyCode.pageUp:
        this.moveSliderTo(this.valueNow + 10)
        flag = true
        break

      case this.keyCode.home:
        this.moveSliderTo(this.railMin)
        flag = true
        break

      case this.keyCode.end:
        this.moveSliderTo(this.railMax)
        flag = true
        break

      default:
        break
    }

    if (flag) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  moveSliderTo = (value, element) => {
    const {min, max, isRange} = this.props

    const left = element.getAttribute('aria-label') === 'min'

    const width = element.getBoundingClientRect().width

    if (value > max) {
      value = max
    }

    if (value < min) {
      value = min
    }

    let pos = Math.round(
      (value - min) * (this.railWidth - 1 * width) / (max - min)
    )

    if (left) {
      element.style.left = pos + 'px'
    } else {
      element.style.left = pos + (isRange ? width : 0) + 'px'
    }
  }

  handleMouseDown = (mouseDownEvent) => {
    const {min, max} = this.props
    const {target} = mouseDownEvent

    const handleMouseMove = (event) => {
      var diffX = event.pageX - this.rail.current.offsetLeft
      const newValue = min + parseInt((max - min) * diffX / this.railWidth)
      this.moveSliderTo(newValue, target)

      event.preventDefault()
      event.stopPropagation()
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    mouseDownEvent.preventDefault()
    event.stopPropagation()
    target.focus()
  }

  componentDidMount() {
    const {isRange, min, max} = this.props
    this.railWidth = this.rail.current.clientWidth
    this.thumbs.filter((thumb) => thumb.current).forEach((thumb) => {
      thumb.current.addEventListener('keydown', this.handleKeyDown)
      thumb.current.addEventListener('mousedown', this.handleMouseDown)
    })

    if (isRange) {
      this.moveSliderTo(min, this.minThumb.current)
      this.moveSliderTo(max, this.maxThumb.current)
    } else {
      this.moveSliderTo(max / 2, this.maxThumb.current)
    }
  }
  render() {
    const {
      isRange,
      showValue,
      showTutorial,
      valuesFormatter,
      min,
      max
    } = this.props

    const {values: {minValue, maxValue}, used} = this.state
    return (
      <Container>
        <Rail
          innerRef={this.rail}
          showValues={valuesFormatter}
          min={valuesFormatter(min)}
          max={valuesFormatter(max)}
        >
          {isRange && (
            <Thumb aria-label="min" innerRef={this.minThumb} tabIndex="0">
              {showTutorial &&
                !used && (
                  <Tutorial>
                    <Icon left>
                      <FontAwesomeIcon icon={faAngleLeft} />
                    </Icon>
                    <Icon>
                      <FontAwesomeIcon icon={faAngleRight} />
                    </Icon>
                  </Tutorial>
                )}
              {showValue && <Tip>R$ {minValue.toLocaleString('pt-BR')}</Tip>}
            </Thumb>
          )}
          <Thumb aria-label="max" innerRef={this.maxThumb} tabIndex="0">
            {showTutorial &&
              !used && (
                <Tutorial>
                  <Icon left>
                    <FontAwesomeIcon icon={faAngleLeft} />
                  </Icon>
                  <Icon>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </Icon>
                </Tutorial>
              )}
            {showValue && <Tip>R$ {maxValue.toLocaleString('pt-BR')}</Tip>}
          </Thumb>
        </Rail>
      </Container>
    )
  }
}
