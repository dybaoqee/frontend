import {Component} from 'react'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import {Container, Content, Neighborhood} from './styles'

export default class Neighborhoods extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Row>
            <Col width={1}>
              <Text fontSize="xlarge" fontWeight="bold" textAlign="center">
                Imóveis à venda no Rio de Janeiro e São Paulo
              </Text>
            </Col>
          </Row>
          <Row>
            <Col width={1}>
              <Text color="grey" textAlign="center">
                Escolha a localidade e confira os imóveis disponíveis
              </Text>
            </Col>
          </Row>
          <Row>
            <Col width={1}>
              <Row>
                <Text fontWeight="bold">
                  Bairros no Rio de Janeiro
                </Text>
              </Row>
              <Row>
                <Col width={4 / 12}>
                  <Neighborhood thumb="copacabana">
                    <Text>Copacabana</Text>
                  </Neighborhood>
                </Col>
                <Col width={4 / 12}>
                  <Neighborhood thumb="ipanema">
                    <Text>Ipanema</Text>
                  </Neighborhood>
                </Col>
                <Col width={4 / 12}>
                  <Neighborhood thumb="leblon">
                    <Text>Leblon</Text>
                  </Neighborhood>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col width={1}>
              <Row>
                <Text fontWeight="bold">
                  Bairros em São Paulo
                </Text>
              </Row>
              <Row>
                <Col width={4 / 12}>
                  <Neighborhood thumb="perdizes">
                    <Text>Perdizes</Text>
                  </Neighborhood>
                </Col>
                <Col width={4 / 12}>
                  <Neighborhood soon={true} thumb="pinheiros">
                    <Text>Pinheiros</Text>
                  </Neighborhood>
                </Col>
                <Col width={4 / 12}>
                  <Neighborhood soon={true} thumb="pompeia">
                    <Text>Pompéia</Text>
                  </Neighborhood>
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
      </Container>
    )
  }
}
