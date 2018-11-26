import {Component} from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import theme from '@emcasa/ui'
import View from '@emcasa/ui-dom/components/View'
import Col from '@emcasa/ui-dom/components/Col'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'
import Input from '@emcasa/ui-dom/components/Input'
import Button from '@emcasa/ui-dom/components/Button'
import {desktopHeaderHeight} from 'constants/dimensions'

const CLOUDINARY_URL = 'https://res.cloudinary.com/emcasa/image/upload/fl_any_format/v1542831121/background'

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
  background-image: url(${CLOUDINARY_URL}/wall-large.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  
  @media (max-width: ${theme.breakpoints[0]}){
    background-image: url(${CLOUDINARY_URL}/wall-small.jpg);
  }
  
  @media (min-aspect-ratio: 2 / 1) {
    background-image: url(${CLOUDINARY_URL}/wall-small.jpg);
  }
 
`

const Content = styled(View)`
  margin-top: ${desktopHeaderHeight}px;
  max-width: 700px;
  
  @media (max-width: ${theme.breakpoints[0]}){
    padding-right: 20px;
    padding-left: 20px;
  }
`

export default class SellListing extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Row justifyContent="center">
            <Col>
              <Text fontSize="xlarge" color="dark" fontWeight="bold" textAlign="center">
                Quer vender seu imóvel?
              </Text>
            </Col>
          </Row>
          <Row justifyContent="center">
            <Col>
              <Text color="gray">
                Vender seu imóvel nunca foi tão fácil, informe o endereço do seu imóvel
                e receba agora uma avaliação grátis
              </Text>
            </Col>
          </Row>
          <Row flexDirection={['column', 'row']}>
            <Col width={[1, 10 / 12]} mr={2} mb={[4, 0]}>
              <CustomInput
                placeholder="Endereço e número"
                hideLabelView
                hideErrorView
              />
            </Col>
            <Col width={[1, 2 / 12]}>
              <Button height="tall" active fluid>
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
