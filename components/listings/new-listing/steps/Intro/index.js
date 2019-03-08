import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Button from '@emcasa/ui-dom/components/Button'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import Arrow from 'components/listings/new-listing/shared/Arrow'
import Container from 'components/listings/new-listing/shared/Container'

const Title = Text.withComponent('h2')
const SubTitle = Text.withComponent('h3')
const ListTitle = styled(SubTitle)`
  display: inline;
  margin: 0;
`

const Background = styled(Row)`

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
                Como funciona vender seu imóvel aqui na EmCasa?
              </Text>
              <View mb={2}>
                <Arrow /><ListTitle fontWeight="normal" inline>Cadastre as informações básicas do imóvel no nosso site</ListTitle>
              </View>
              <View mb={2}>
                <Arrow /><ListTitle fontWeight="normal" inline>Visualize nossa avaliação online do seu imóvel</ListTitle>
              </View>
              <View mb={2}>
                <Arrow /><ListTitle fontWeight="normal" inline>Agende Tour Virtual 3D ou fotos profissionais sem custo</ListTitle>
              </View>
              <View mb={2}>
                <Arrow /><ListTitle fontWeight="normal" inline>Cuidamos de toda burocracia, contratos e documentação</ListTitle>
              </View>
            <Row justifyContent="center" mt={4}>
                <Col width={[1, 1/2]}>
                  <Button
                    fluid
                    active
                    height="tall"
                    onClick={this.nextStep}>Quero Vender</Button>
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
