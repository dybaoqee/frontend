import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@emcasa/ui-dom/components/Button'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import Container from 'components/listings/new-listing/shared/Container'
import { BUTTON_WIDTH } from 'components/listings/new-listing/styles'

class ProgressDialog extends Component {
  render() {
    return (
      <Container>
        <Col width={[1,null,null,1/2]}>
          <Row>
            <Text>Você já estava cadastrando seu imóvel da {this.props.address}. Gostaria de continuar de onde parou?</Text>
          </Row>
          <Row justifyContent="space-between">
            <Col>
              <Button style={{width: BUTTON_WIDTH}} fluid onClick={this.props.onReset}>Não</Button>
            </Col>
            <Col>
              <Button style={{width: BUTTON_WIDTH}} fluid active onClick={this.props.onResume}>Sim</Button>
            </Col>
          </Row>
        </Col>
      </Container>
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
