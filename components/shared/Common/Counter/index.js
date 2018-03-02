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
      counter: props.min || 0
    }
  }

  makeIncrementer = (amount) => () =>
    this.setState((prevState) => ({counter: prevState.counter + amount}))

  IncrementItem = this.makeIncrementer(1)
  DecreaseItem = this.makeIncrementer(-1)

  componentWillUpdate(prevProps, nextState) {
    const {counter} = nextState
    const {onChange} = this.props
    onChange && onChange(counter)
  }

  render() {
    const {min = 0, max = 20} = this.props
    const {counter} = this.state
    return (
      <CounterContainer>
        <CounterButton disabled={counter <= min} onClick={this.DecreaseItem}>
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
