import {Component} from 'react'
import Link from 'next/link'
import {withBreakpoint} from '@emcasa/ui-dom/components/Breakpoint'
import Col from '@emcasa/ui-dom/components/Col'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'
import NeighborhoodAutoComplete from 'components/shared/NeighborhoodAutoComplete'
import NeighborhoodPicker from 'components/shared/NeighborhoodPicker'
import MobileAddressButton from 'components/shared/MobileAddressButton'
import { MobileTypeaheadContainer } from 'components/shared/NeighborhoodAutoComplete/styles'
import { USE_NEW_SEARCH } from 'config/globals'
import ScrollTracker from 'components/shared/ScrollTracker'
import {
  log,
  BUYER_LANDING_SCROLL_25,
  BUYER_LANDING_SCROLL_50,
  BUYER_LANDING_SCROLL_75,
  BUYER_LANDING_SCROLL_100
} from 'lib/logging'
import {
  UnderlinedText,
  Container,
  Content
} from './styles'

class BuyListing extends Component {
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

  renderSearch() {
    if (USE_NEW_SEARCH) {
      return (
        this.props.isMobile ?
          <Col mb={4}>
            <NeighborhoodPicker
              fromHome
              onClick={this.openMobileAddressInput}
              fullscreen={this.state.showMobileAddressInput}
            />
          </Col>
        :
          <Col mb={2} width={1}>
            <NeighborhoodPicker
              fromHome
            />
        </Col>
      )
    }

    return (
      this.props.isMobile ?
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
    )
  }

  render() {
    if (this.state.showMobileAddressInput) {
      return (
        USE_NEW_SEARCH ?
          <MobileTypeaheadContainer justifyContent="center" p={4}>
            <Col width={1}>
              <NeighborhoodPicker
                mobile
                fromHome
                fullscreen
                onBackPressed={this.close}
              />
            </Col>
          </MobileTypeaheadContainer>
        :
        <MobileTypeaheadContainer justifyContent="center" p={4}>
          <Col width={1}>
            <NeighborhoodAutoComplete
              onBackPressed={this.close}
              onClearInput={() => {}}
            />
          </Col>
        </MobileTypeaheadContainer>
      )
    }

    return (
      <Container>
        <ScrollTracker
          onScroll25={() => {log(BUYER_LANDING_SCROLL_25)}}
          onScroll50={() => {log(BUYER_LANDING_SCROLL_50)}}
          onScroll75={() => {log(BUYER_LANDING_SCROLL_75)}}
          onScroll100={() => {log(BUYER_LANDING_SCROLL_100)}}
        />
        <Content>
          <Row justifyContent="center" px={[4, 4, 4,  0]}>
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
          <Row justifyContent="center" px={[4, 4, 4,  0]}>
            <Col>
              <Text color="gray" style={{margin: '0.5em'}}>
                Comprar seu imóvel nunca foi tão fácil, informe o bairro ou cidade
                e comece a sua pesquisa
              </Text>
            </Col>
          </Row>
          <Row flexDirection={['column', 'column', 'column',  'row']} px={[4, 4, 4,  0]}>
            <Col width={1} mr={[0, 0, 0,  2]}>
              {this.renderSearch()}
            </Col>
          </Row>
          <Row justifyContent="center">
            <Col>
              <Link passHref href="/vender">
                <a>
                  <UnderlinedText color="pink">Você quer vender?</UnderlinedText>
                </a>
              </Link>
            </Col>
          </Row>
        </Content>
      </Container>
    )
  }
}

export default withBreakpoint()(BuyListing)
