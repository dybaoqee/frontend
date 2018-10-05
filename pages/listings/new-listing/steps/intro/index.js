import React, { Component } from 'react'
import Button from '@emcasa/ui-dom/components/Button'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'

class Intro extends Component {
  render() {
    return (
      <View>
        <Text fontSize="large">Como funciona anunciar aqui na EmCasa?</Text>
        <Text>Venda seu imóvel do jeito fácil e seguro.</Text>
        <Text>Cadastre seu imóvel no nosso site</Text>
        <Text>Agende grátis um Tour Virtual 3D e uma sessão de fotos do seu imóvel</Text>
        <Text>Economize tempo e dinheiro anunciando seu imóvel com a gente</Text>
        <Text>Pré avaliação grátis do seu imóvel</Text>
        <Text>Assistência jurídica grátis</Text>
        <Row>
          <Button active height="tall">Quero Anunciar</Button>
        </Row>
      </View>
    )
  }
}

export default Intro
