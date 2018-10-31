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
            disabled={!this.props.submitEnabled || this.props.loading}
            onClick={this.props.onSubmit}>
            {this.props.loading ? 'Aguarde...' : 'Avançar'}
          </Button>
        </Col>
      </Row>
    )
  }

  static propTypes = {
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
