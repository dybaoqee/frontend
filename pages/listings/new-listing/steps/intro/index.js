import React, { Component } from 'react'
import Button from '@emcasa/ui-dom/components/Button'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import Icon from '@emcasa/ui-dom/components/Icon'

class Intro extends Component {
  icon = () => {
    return (<Icon type="circle-right" color="blue" mr={4} />)
  }
  render() {
    return (
      <View p={4}>
        <View mb="80px">
          <Text
            fontSize="large"
            fontWeight="bold"
            textAlign="center"
          >
            Como funciona anunciar aqui na EmCasa?
          </Text>
          <Text color="grey" textAlign="center">Venda seu imóvel do jeito fácil e seguro.</Text>
          <Row>
            <Col width={1/12}>{this.icon()}</Col>
            <Col width={11/12}><Text inline>Cadastre seu imóvel no nosso site</Text></Col>
          </Row>
          <Row>
            <Col width={1/12}>{this.icon()}</Col>
            <Col width={11/12}><Text>Agende grátis um Tour Virtual 3D e uma sessão de fotos do seu imóvel</Text></Col>
          </Row>
          <Row>
            <Col width={1/12}>{this.icon()}</Col>
            <Col width={11/12}><Text>Economize tempo e dinheiro anunciando seu imóvel com a gente</Text></Col>
          </Row>
          <Row>
            <Col width={1/12}>{this.icon()}</Col>
            <Col width={11/12}><Text>Pré avaliação grátis do seu imóvel</Text></Col>
          </Row>
          <Row>
            <Col width={1/12}>{this.icon()}</Col>
            <Col width={11/12}><Text>Assistência jurídica grátis</Text></Col>
          </Row>
        </View>
        <View p={4} style={{position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#fff'}}>
          <Button fluid active height="tall">Quero Anunciar</Button>
        </View>
      </View>
    )
  }
}

export default Intro
