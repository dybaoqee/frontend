import {Component} from 'react'
import View from '@emcasa/ui-dom/components/View'
import Col from '@emcasa/ui-dom/components/Col'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'

export default class Benefits extends Component {
  render() {
    return (
      <View>
        <Row>
          <Col>
            <Text fontSize="large" color="dark">
              Conheça as vantagens de vender com a EmCasa!
            </Text>
          </Col>
        </Row>
        <Row>
          <Col width={3 / 12}>
            <Text fontSize="xlarge" color="dark">
              Tour Virtual 3D
            </Text>
            <Text color="gray">
              O Tour Virtual 3D permite que as pessoas vejam o imóvel de uma
              maneira diferenciada
            </Text>
          </Col>
          <Col width={3 / 12}>
            <Text fontSize="xlarge" color="dark">
              Avaliação precisa
            </Text>
            <Text color="gray">
              Nossa plataforma calcula automaticamente o valor do seu imóvel
            </Text>
          </Col>
          <Col width={3 / 12}>
            <Text fontSize="xlarge" color="dark">
              Assitência jurídica
            </Text>
            <Text color="gray">
              Aqui você tem Assistência Jurídica grátis com documentação e processos
            </Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button>Vender meu imóvel</Button>
          </Col>
        </Row>
      </View>
    )
  }
}
