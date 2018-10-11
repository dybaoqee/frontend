import React, { Component } from 'react'
import Button from '@emcasa/ui-dom/components/Button'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import Arrow from 'components/listings/new-listing/shared/Arrow'

class Intro extends Component {
  render() {
    return (
      <Row justifyContent="center">
        <Col width={[1, 1/2]}>
        <View body p={4}>
          <Text
            fontSize="large"
            fontWeight="bold"
            textAlign="center"
          >
            Como funciona anunciar aqui na EmCasa?
          </Text>
          <Text color="grey">Venda seu imóvel do jeito fácil e seguro.</Text>
          <View>
            <Arrow /><Text inline>Cadastre seu imóvel no nosso site</Text>
          </View>
          <View>
            <Arrow /><Text inline>Agende grátis um Tour Virtual 3D e uma sessão de fotos do seu imóvel</Text>
          </View>
          <View>
            <Arrow /><Text inline>Economize tempo e dinheiro anunciando seu imóvel com a gente</Text>
          </View>
          <View>
            <Arrow /><Text inline>Pré avaliação grátis do seu imóvel</Text>
          </View>
          <View>
            <Arrow /><Text inline>Assistência jurídica grátis</Text>
          </View>
        </View>
        <Row justifyContent="center">
          <Col width={[1, 1/2]}>
            <View bottom p={4}>
              <Button
                fluid
                active
                height="tall"
                onClick={this.props.nextStep}>Quero Anunciar</Button>
            </View>
          </Col>
        </Row>
        </Col>
      </Row>
    )
  }
}

export default Intro
