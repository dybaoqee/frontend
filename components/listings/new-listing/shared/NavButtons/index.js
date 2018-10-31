import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Button from '@emcasa/ui-dom/components/Button'

class NavButtons extends PureComponent {
  constructor(props) {
    super(props)
    this.onPressEnter = this.onPressEnter.bind(this)
  }

  onPressEnter(e) {
    if (e.key !== 'Enter') return
    if (this.props.nextEnabled) {
      this.props.nextStep()
    }
  }

  componentDidMount() {
    document.addEventListener('keypress', this.onPressEnter)
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.onPressEnter)
  }

  render() {
    return (
      <Row justifyContent="space-between">
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
            disabled={!this.props.nextEnabled || this.props.loading}
            onClick={this.props.nextStep}>
            {this.props.loading ? 'Aguarde...' : 'Avançar'}
          </Button>
        </Col>
      </Row>
    )
  }

  static propTypes = {
    previousStep: PropTypes.func,
    nextStep: PropTypes.func,
    nextEnabled: PropTypes.bool.isRequired,
    loading: PropTypes.bool
  }

  static defaultProps = {
    previousStep: null,
    nextStep: null,
    nextEnabled: false,
    loading: false
  }
}

export default NavButtons
