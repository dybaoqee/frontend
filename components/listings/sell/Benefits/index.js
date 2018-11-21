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
  max-width: 1100px;
`

const Icon = styled.div`
  background-image: url('/static/svg-icons/${props => props.name}.svg');
  background-repeat: no-repeat;
  background-size: cover;
  width: 70px;
  height: 70px;
  margin-bottom: 30px;
`

const BenefitCol = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  p {
    margin-bottom: 8px;
    margin-top: 0;
  }
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
            <BenefitCol width={3 / 12}>
              <Icon name="tour-3d" />
              <Text fontSize="large" color="dark">
                Tour Virtual 3D
              </Text>
              <Text color="gray">
                O Tour Virtual 3D permite que as pessoas vejam o imóvel de uma
                maneira diferenciada
              </Text>
            </BenefitCol>
            <BenefitCol width={3 / 12}>
              <Icon name="avaliacao-precisa" />
              <Text fontSize="large" color="dark">
                Avaliação precisa
              </Text>
              <Text color="gray">
                Nossa plataforma calcula automaticamente o valor do seu imóvel
              </Text>
            </BenefitCol>
            <BenefitCol width={3 / 12}>
              <Icon name="assistencia-juridica" />
              <Text fontSize="large" color="dark">
                Assitência jurídica
              </Text>
              <Text color="gray">
                Aqui você tem Assistência Jurídica grátis com documentação e
                processos
              </Text>
            </BenefitCol>
          </Row>
          <Row justifyContent="center">
            <Col width={4 / 12}>
              <Link href="/vender/imovel">
                <Button height="tall" fluid>
                  Vender meu imóvel
                </Button>
              </Link>
            </Col>
          </Row>
        </Content>
      </Container>
    )
  }
}
