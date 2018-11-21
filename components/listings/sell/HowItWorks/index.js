import {Component} from 'react'
import View from '@emcasa/ui-dom/components/View'
import Col from '@emcasa/ui-dom/components/Col'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'

export default class HowItWorks extends Component {
  render() {
    return (
      <View>
        <Row>
          <Col>
            <Text fontSize="large" color="dark">
              100% de Satisfação Garantida
            </Text>
          </Col>
        </Row>
        <Row>
          <Col width={2 / 12}>
            <Text fontSize="medium" color="dark">
              Cadastro do Imóvel
            </Text>
          </Col>
          <Col width={2 / 12}>
            <Text fontSize="medium" color="dark">
              Avaliação precisa do seu imóvel
            </Text>
          </Col>
          <Col width={2 / 12}>
            <Text fontSize="medium" color="dark">
              Tour Virtual 3D e Fotos Profissionais
            </Text>
          </Col>
          <Col width={2 / 12}>
            <Text fontSize="medium" color="dark">
              Imóvel Publicado
            </Text>
          </Col>
          <Col width={2 / 12}>
            <Text fontSize="medium" color="dark">
              Visitas Agendadas
            </Text>
          </Col>
          <Col width={2 / 12}>
            <Text fontSize="medium" color="dark">
              Venda finalizada
            </Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button>Quero vender meu imóvel</Button>
          </Col>
        </Row>
      </View>
    )
  }
}
