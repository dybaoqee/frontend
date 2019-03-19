import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Button from '@emcasa/ui-dom/components/Button'
import { BUTTON_WIDTH } from 'components/listings/new-listing/styles'

const NEXT_LABEL = 'Avançar'
const LOADING_LABEL = 'Aguarde...'
const PREVIOUS_LABEL = 'Voltar'

class NavButtons extends PureComponent {
  constructor(props) {
    super(props)
    this.onPressEnter = this.onPressEnter.bind(this)
    this.getPreviousLabel = this.getPreviousLabel.bind(this)
    this.getNextLabel = this.getNextLabel.bind(this)
  }

  onPressEnter(e) {
    if (e.key !== 'Enter') return
    if (this.props.submitEnabled) {
      this.props.onSubmit()
    }
  }

  componentDidMount() {
    if (!this.props.disableEnterToSubmit) {
      document.addEventListener('keypress', this.onPressEnter)
    }
  }

  componentWillUnmount() {
    if (!this.props.disableEnterToSubmit) {
      document.removeEventListener('keypress', this.onPressEnter)
    }
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
    const { nextButtonWidth, previousButtonWidth } = this.props
    return (
      <Row justifyContent="space-between" mt={4}>
        <Col>
          <Button
            style={{width: previousButtonWidth ? previousButtonWidth : BUTTON_WIDTH}}
            height="tall"
            onClick={this.props.previousStep}>{this.getPreviousLabel()}</Button>
        </Col>
        <Col>
          <Button
            style={{width: nextButtonWidth ? nextButtonWidth : BUTTON_WIDTH}}
            height="tall"
            active={!this.props.loading}
            disabled={this.props.loading || !this.props.submitEnabled}
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
    loading: PropTypes.bool,
    disableEnterToSubmit: PropTypes.bool,
    nextButtonWidth: PropTypes.number,
    previousButtonWidth: PropTypes.number
  }

  static defaultProps = {
    previousStep: null,
    onSubmit: null,
    submitEnabled: false,
    loading: false
  }
}

export default NavButtons
