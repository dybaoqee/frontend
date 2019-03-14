import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Button from '@emcasa/ui-dom/components/Button'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import Container from 'components/listings/new-listing/shared/Container'
import NumberedList from 'components/shared/NumberedList'
import { LARGE_BUTTON_WIDTH } from 'components/listings/new-listing/styles'

const Title = Text.withComponent('h2')
const SubTitle = Text.withComponent('h3')
const ListTitle = styled(SubTitle)`
  display: inline;
  margin: 0;
`

const Background = styled(Row)`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  justify-content: center;
  background-image: url(https://res.cloudinary.com/emcasa/image/upload/fl_any_format/v1542831121/background/wall-small);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
`

class Intro extends PureComponent {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
  }

  nextStep() {
    const { navigateTo } = this.props
    navigateTo('addressInput')
  }

  render() {
    return (
      <div ref={this.props.hostRef}>
        <Background>
          <Container>
            <Col width={1}>
              <Text
                fontSize="large"
                fontWeight="bold"
                textAlign="center"
              >
                {this.props.evaluation ? "Descubra agora por quanto vender seu imóvel" : "Como funciona vender seu imóvel aqui na EmCasa?"}
              </Text>
              <Row justifyContent="center">
                <Col>
                  <NumberedList
                    content={[
                      "Preencha as informações básicas do imóvel",
                      "Veja nossa recomendação do valor de venda sem compromisso",
                      this.props.evaluation ? "Conheça nosso Tour Virtual e aumente as chances de vender" :
                      "Aumente as chances de vender com o Tour Virtual"
                    ]}
                  />
                </Col>
              </Row>
              <Row justifyContent="center" mt={4}>
                <Col>
                  <Button
                    style={{width: LARGE_BUTTON_WIDTH}}
                    active
                    height="tall"
                    onClick={this.nextStep}>{this.props.evaluation ? "Avaliar" : "Quero Vender"}</Button>
                </Col>
              </Row>
            </Col>
          </Container>
        </Background>
      </div>
    )
  }
}

export default Intro
