import {Component} from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import View from '@emcasa/ui-dom/components/View'
import Col from '@emcasa/ui-dom/components/Col'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'
import Input from '@emcasa/ui-dom/components/Input'
import Button from '@emcasa/ui-dom/components/Button'

const UnderlinedText = styled(Text)`
  text-decoration: underline;
  cursor: pointer;
`

const CustomInput = styled(Input)`
  box-sizing: border-box;
`

const Container = styled(View)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-self: stretch;
  background: url(https://res.cloudinary.com/emcasa/image/upload/fl_any_format/v1542831121/background/wall-large.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
`

const Content = styled(View)`
  max-width: 700px;
`

export default class SellListing extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Row justifyContent="center">
            <Col>
              <Text fontSize="xlarge" color="dark" fontWeight="bold">
                Quer vender seu imóvel?
              </Text>
            </Col>
          </Row>
          <Row justifyContent="center">
            <Col>
              <Text color="gray">
                Vender seu imóvel com a EmCasa nunca foi tão fácil, informe o endereço do seu imóvel
                e faremos uma pré-avaliação do valor para você
              </Text>
            </Col>
          </Row>
          <Row>
            <Col width={10 / 12} mr={2}>
              <CustomInput
                placeholder="Endereço e número"
                hideLabelView
                hideErrorView
              />
            </Col>
            <Col width={2 / 12}>
              <Button height="tall" active>
                Avaliar
              </Button>
            </Col>
          </Row>
          <Row justifyContent="center">
            <Col>
              <Link href="/">
                <UnderlinedText color="pink">Você quer comprar?</UnderlinedText>
              </Link>
            </Col>
          </Row>
        </Content>
      </Container>
    )
  }
}
