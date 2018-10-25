import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@emcasa/ui-dom/components/Button'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'

class ProgressDialog extends Component {
  render() {
    return (
      <Row m={4} justifyContent="center">
        <Col width={[1, 1/2]}>
          <Row>
            <Text>Você já estava cadastrando seu imóvel da {this.props.address}. Gostaria de continuar de onde parou?</Text>
          </Row>
          <Row justifyContent="space-between">
            <Col width={[1/3, 5/12]}>
              <Button fluid onClick={this.props.onReset}>Não</Button>
            </Col>
            <Col width={[1/3, 5/12]}>
              <Button fluid active onClick={this.props.onResume}>Sim</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }

  static propTypes = {
    address: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    onResume: PropTypes.func.isRequired
  }

  static defaultProps = {
    address: null,
    onReset: null,
    onResume: null
  }
}

export default ProgressDialog
