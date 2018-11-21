import {Component} from 'react'
import View from '@emcasa/ui-dom/components/View'
import Col from '@emcasa/ui-dom/components/Col'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'
import Input from '@emcasa/ui-dom/components/Input'
import Button from '@emcasa/ui-dom/components/Button'

export default class SellListing extends Component {
  render() {
    return (
      <View>
        <Row>
          <Col>
            <Text fontSize="xlarge" color="dark">
              Quer vender seu imóvel?
            </Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text fontSize="large" color="gray">
              Vender seu imóvel com a EmCasa nunca foi tão fácil, informe o endereço do seu imóvel
              e faremos uma pré-avaliação do valor para você
            </Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Input />
            <Button active>Avaliar</Button>
          </Col>
        </Row>
      </View>
    )
  }
}
