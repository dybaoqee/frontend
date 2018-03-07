import {Component} from 'react'
import PropTypes from 'prop-types'
import CounterContainer, {CounterButton} from './styles'
export default class Counter extends Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number
  }
  constructor(props) {
    super(props)
    this.state = {
      counter: props.defaultValue || props.min || 0
    }
  }

  makeIncrementer = (amount) => () => {
    const {onChange, name} = this.props
    this.setState((prevState) => {
      const updatedValue = prevState.counter + amount
      onChange && onChange({target: {name, value: updatedValue}})
      return {counter: updatedValue}
    })
  }

  IncrementItem = this.makeIncrementer(1)
  DecreaseItem = this.makeIncrementer(-1)

  render() {
    const {min = 0, max = 20} = this.props
    const {counter} = this.state
    return (
      <CounterContainer>
        <CounterButton
          className="minus"
          disabled={counter <= min}
          onClick={this.DecreaseItem}
        >
          -
        </CounterButton>
        <span>{this.state.counter}</span>
        <CounterButton disabled={counter >= max} onClick={this.IncrementItem}>
          +
        </CounterButton>
      </CounterContainer>
    )
  }
}
