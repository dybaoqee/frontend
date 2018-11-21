import {Component} from 'react'
import Link from 'next/link'
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

const Icon = styled.div`
  background-image: url('/static/svg-icons/${props => props.name}.svg');
  background-repeat: no-repeat;
  background-size: cover;
  width: 50px;
  height: 50px;
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
              <Icon name="cadastro-imovel" />
              <Text fontSize="medium" color="dark">
                Cadastro do Imóvel
              </Text>
            </Col>
            <Col width={2 / 12}>
              <Icon name="avaliacao-precisa" />
              <Text fontSize="medium" color="dark">
                Avaliação precisa do seu imóvel
              </Text>
            </Col>
            <Col width={2 / 12}>
              <Icon name="tour-3d" />
              <Text fontSize="medium" color="dark">
                Tour Virtual 3D e Fotos Profissionais
              </Text>
            </Col>
            <Col width={2 / 12}>
              <Icon name="publicacao" />
              <Text fontSize="medium" color="dark">
                Imóvel Publicado
              </Text>
            </Col>
            <Col width={2 / 12}>
              <Icon name="acesso-compradores" />
              <Text fontSize="medium" color="dark">
                Visitas Agendadas
              </Text>
            </Col>
            <Col width={2 / 12}>
              <Icon name="venda-finalizada" />
              <Text fontSize="medium" color="dark">
                Venda finalizada
              </Text>
            </Col>
          </Row>
          <Row justifyContent="center">
            <Col width={4 / 12}>
              <Link href="/vender/imovel">
                <Button height="tall" fluid>
                  Quero vender meu imóvel
                </Button>
              </Link>
            </Col>
          </Row>
        </Content>
      </Container>
    )
  }
}
