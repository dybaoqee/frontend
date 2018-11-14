import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Button from '@emcasa/ui-dom/components/Button'

const NEXT_LABEL = 'Avançar'
const LOADING_LABEL = 'Aguarde...'
const PREVIOUS_LABEL = 'Voltar'

class NavButtons extends PureComponent {
  constructor(props) {
    super(props)
    this.onPressEnter = this.onPressEnter.bind(this)
    this.getNextLabel = this.getNextLabel.bind(this)
  }

  onPressEnter(e) {
    if (e.key !== 'Enter') return
    if (this.props.submitEnabled) {
      this.props.onSubmit()
    }
  }

  componentDidMount() {
    document.addEventListener('keypress', this.onPressEnter)
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.onPressEnter)
  }

  getNextLabel() {
    const { nextLabel, loading } = this.props
    if (nextLabel) {
      return nextLabel
    }
    return loading ? LOADING_LABEL : NEXT_LABEL
  }

  getPreviousLabel() {
    const { previousLabel } = this.props
    return previousLabel ? previousLabel : PREVIOUS_LABEL
  }

  render() {
    return (
      <Row justifyContent="space-between" mt={4}>
        <Col width={5/12}>
          <Button
            fluid
            height="tall"
            onClick={this.props.previousStep}>Voltar</Button>
        </Col>
        <Col width={5/12}>
          <Button
            fluid
            height="tall"
            active={!this.props.loading}
            disabled={!this.props.submitEnabled || this.props.loading}
            onClick={this.props.onSubmit}>
            {this.getNextLabel()}
          </Button>
        </Col>
      </Row>
    )
  }

  static propTypes = {
    previousLabel: PropTypes.string,
    nextLabel: PropTypes.string,
    previousStep: PropTypes.func,
    onSubmit: PropTypes.func,
    submitEnabled: PropTypes.bool.isRequired,
    loading: PropTypes.bool
  }

  static defaultProps = {
    previousStep: null,
    onSubmit: null,
    submitEnabled: false,
    loading: false
  }
}

export default NavButtons
