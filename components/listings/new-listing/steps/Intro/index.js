import React, { PureComponent } from 'react'
import Button from '@emcasa/ui-dom/components/Button'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Container from 'components/listings/new-listing/shared/Container'
import NumberedList from 'components/shared/NumberedList'
import { LARGE_BUTTON_WIDTH } from 'components/listings/new-listing/styles'
import {
  Space,
  Title,
  Background
} from './styles'

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
              <Space />
              <Title
                fontSize="xlarge"
                fontWeight="500"
                textAlign="center"
              >
                {this.props.evaluation ? "Descubra agora por quanto vender seu imóvel" : "Como vender seu imóvel na EmCasa?"}
              </Title>
              <Row justifyContent="center">
                <Col>
                  <NumberedList
                    content={[
                      "Preencha as informações básicas do imóvel",
                      "Veja nossa recomendação do valor de venda",
                      this.props.evaluation ? "Conheça nosso Tour Virtual 3D e aumente as chances de vender" :
                      "Aumente as chances de vender com o Tour Virtual 3D"
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
