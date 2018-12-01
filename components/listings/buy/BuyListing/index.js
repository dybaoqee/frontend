import {Component} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Col from '@emcasa/ui-dom/components/Col'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'
import {isMobile} from 'lib/mobile'
import NeighborhoodAutoComplete from 'components/shared/NeighborhoodAutoComplete'
import MobileAddressButton from 'components/shared/MobileAddressButton'
import { MobieTypeaheadContainer } from 'components/shared/NeighborhoodAutoComplete/styles'

import {
  UnderlinedText,
  Container,
  Content
} from './styles'

export default class BuyListing extends Component {
  constructor(props) {
    super(props)
    this.openMobileAddressInput = this.openMobileAddressInput.bind(this)
    this.close = this.close.bind(this)
  }

  state = {
    showMobileAddressInput: false,
    addressFormatted: null,
  }

  openMobileAddressInput() {
    this.setState({
      showMobileAddressInput: true
    })
  }

  close() {
    this.setState({
      showMobileAddressInput: false
    })
  }

  render() {
    if (this.state.showMobileAddressInput) {
      return (
        <MobieTypeaheadContainer justifyContent="center" p={4}>
          <Col width={1}>
            <NeighborhoodAutoComplete
              onBackPressed={this.close}
              onClearInput={() => {}}
            />
          </Col>
        </MobieTypeaheadContainer>
      )
    }

    return (
      <Container>
        <Content>
          <Row justifyContent="center" px={[4, 0]}>
            <Col>
              <Text
                fontSize="xlarge"
                color="dark"
                fontWeight="bold"
                textAlign="center"
                style={{marginBottom: 0, marginTop: 0}}>
                {this.props.title}
              </Text>
            </Col>
          </Row>
          <Row justifyContent="center" px={[4, 0]}>
            <Col>
              <Text color="gray" style={{margin: '0.5em'}}>
                Comprar seu imóvel nunca foi tão fácil, informe o bairro ou cidade
                e comece a sua pesquisa
              </Text>
            </Col>
          </Row>
          <Row flexDirection={['column', 'row']} px={[4, 0]}>
            <Col width={[1, 10 / 12]} mr={[0, 2]}>
              {isMobile() ?
                <Col mb={4}>
                  <MobileAddressButton
                    onClick={this.openMobileAddressInput}
                    address="Bairro ou Cidade"
                  />
                </Col>
              :
                <Col mb={2} width={1}>
                  <NeighborhoodAutoComplete
                    defaultValue={this.state.address}
                    onClearInput={() => {}}
                  />
                </Col>
              }
            </Col>
            <Col width={[1, 2 / 12]} mb={[5, 0]}>
              <Button height="tall" active fluid onClick={() => {
                Router.push('/imoveis')
              }}>
                Pesquisar
              </Button>
            </Col>
          </Row>
          <Row justifyContent="center">
            <Col>
              <Link href="/vender">
                <UnderlinedText color="pink">Você quer vender?</UnderlinedText>
              </Link>
            </Col>
          </Row>
        </Content>
      </Container>
    )
  }
}
