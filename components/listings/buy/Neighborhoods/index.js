import {Component} from 'react'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import {Container, Content} from './styles'

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
        </Content>
      </Container>
    )
  }
}
