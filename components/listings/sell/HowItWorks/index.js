import {Component} from 'react'
import styled from 'styled-components'
import View from '@emcasa/ui-dom/components/View'
import Col from '@emcasa/ui-dom/components/Col'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'

const Container = styled(View)`
  display: flex;
  justify-content: center;
`

const Content = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 1100px;
`

export default class HowItWorks extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Row justifyContent="center">
            <Col>
              <Text fontSize="xlarge" color="dark" fontWeight="bold">
                100% de Satisfação Garantida
              </Text>
            </Col>
          </Row>
          <Row justifyContent="center">
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
          <Row justifyContent="center">
            <Col width={4 / 12}>
              <Button height="tall" fluid>
                Quero vender meu imóvel
              </Button>
            </Col>
          </Row>
        </Content>
      </Container>
    )
  }
}
