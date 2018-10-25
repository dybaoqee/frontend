import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Button from '@emcasa/ui-dom/components/Button'

class NavButtons extends PureComponent {
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
            active
            disabled={!this.props.nextEnabled}
            onClick={this.props.nextStep}>Avançar</Button>
        </Col>
      </Row>
    )
  }

  static propTypes = {
    previousStep: PropTypes.func,
    nextStep: PropTypes.func,
    nextEnabled: PropTypes.bool.isRequired
  }

  static defaultProps = {
    previousStep: null,
    nextStep: null,
    nextEnabled: false
  }
}

export default NavButtons
