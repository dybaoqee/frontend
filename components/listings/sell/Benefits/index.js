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
  max-width: 1100px;
`

export default class Benefits extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Row justifyContent="center">
            <Col>
              <Text fontSize="large" color="dark" fontWeight="bold">
                Conheça as vantagens de vender com a EmCasa!
              </Text>
            </Col>
          </Row>
          <Row justifyContent="center">
            <Col width={3 / 12}>
              <Text fontSize="large" color="dark">
                Tour Virtual 3D
              </Text>
              <Text color="gray">
                O Tour Virtual 3D permite que as pessoas vejam o imóvel de uma
                maneira diferenciada
              </Text>
            </Col>
            <Col width={3 / 12}>
              <Text fontSize="large" color="dark">
                Avaliação precisa
              </Text>
              <Text color="gray">
                Nossa plataforma calcula automaticamente o valor do seu imóvel
              </Text>
            </Col>
            <Col width={3 / 12}>
              <Text fontSize="large" color="dark">
                Assitência jurídica
              </Text>
              <Text color="gray">
                Aqui você tem Assistência Jurídica grátis com documentação e processos
              </Text>
            </Col>
          </Row>
          <Row justifyContent="center">
            <Col width={4 / 12}>
              <Button height="tall" fluid>
                Vender meu imóvel
              </Button>
            </Col>
          </Row>
        </Content>
      </Container>
    )
  }
}
