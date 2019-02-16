import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Button from '@emcasa/ui-dom/components/Button'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import Arrow from 'components/listings/new-listing/shared/Arrow'

const Title = Text.withComponent('h2')
const SubTitle = Text.withComponent('h3')
const ListTitle = styled(SubTitle)`
  display: inline;
  margin: 0;
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
        <Row justifyContent="center" p={4} pt={0}>
          <Col width={[1,null,null,1/2]}>
            <Text
              fontSize="large"
              fontWeight="bold"
              textAlign="center"
            >
              Como funciona vender seu imóvel aqui na EmCasa?
            </Text>
            <Title fontWeight="normal" color="grey">Venda seu imóvel de um jeito fácil e seguro.</Title>
            <View mb={2}>
              <Arrow /><ListTitle fontWeight="normal" inline>Cadastre seu imóvel no nosso site</ListTitle>
            </View>
            <View mb={2}>
              <Arrow /><ListTitle fontWeight="normal" inline>Agende Tour Virtual 3D / Fotos grátis</ListTitle>
            </View>
            <View mb={2}>
              <Arrow /><ListTitle fontWeight="normal" inline>Avaliação online do seu imóvel</ListTitle>
            </View>
            <View mb={2}>
              <Arrow /><ListTitle fontWeight="normal" inline>Cuidamos de toda burocracia, contratos e documentação
            </ListTitle>
            </View>
            <View mb={2}>
              <Arrow /><ListTitle fontWeight="normal" inline>Economize tempo e dinheiro anunciando seu imóvel com a gente</ListTitle>
            </View>
            <Row justifyContent="center" mt={4}>
              <Col width={[1,null,null,1/2]}>
                <Button
                  fluid
                  active
                  height="tall"
                  onClick={this.nextStep}>Quero Vender</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Intro
