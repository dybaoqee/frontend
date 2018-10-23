import React, { Component } from 'react'
import Button from '@emcasa/ui-dom/components/Button'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'

class ProgressDialog extends Component {
  render() {
    console.log('rendering progress dialog')
    return (
      <View m={4}>
        <Row justifyContent="center">
          <Text>Você já estava cadastrando seu imóvel anteriormente. Gostaria de continuar de onde parou?</Text>
        </Row>
        <Row justifyContent="space-between">
          <Col width={[1/3, 1/12]}>
            <Button fluid onClick={this.props.onReset}>Não</Button>
          </Col>
          <Col width={[1/3, 1/12]}>
            <Button fluid active onClick={this.props.onResume}>Sim</Button>
          </Col>
        </Row>
      </View>
    )
  }
}

export default ProgressDialog
