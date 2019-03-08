import {Component} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import Col from '@emcasa/ui-dom/components/Col'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'
import {isMobile} from 'lib/mobile'
import AddressAutoComplete from 'components/shared/AddressAutoComplete'
import MobileAddressButton from 'components/shared/MobileAddressButton'
import { MobileTypeaheadContainer } from 'components/shared/AddressAutoComplete/styles'
import ScrollTracker from 'components/shared/ScrollTracker'
import {
  log,
  SELLER_LANDING_SCROLL_25,
  SELLER_LANDING_SCROLL_50,
  SELLER_LANDING_SCROLL_75,
  SELLER_LANDING_SCROLL_100
} from 'lib/logging'
import {
  UnderlinedText,
  Container,
  Content
} from './styles'

export default class SellListing extends Component {
  constructor(props) {
    super(props)
    this.openMobileAddressInput = this.openMobileAddressInput.bind(this)
    this.close = this.close.bind(this)
  }

  state = {
    showMobileAddressInput: false,
    addressFormatted: null,
    addressData: null
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
        <MobileTypeaheadContainer justifyContent="center" p={4}>
          <Col width={1}>
            <AddressAutoComplete
              onBackPressed={this.close}
              defaultValue={this.state.addressFormatted}
              onClearInput={() => {}}
              onSelectAddress={(addressFormatted, addressData) => {
                this.setState({
                  showMobileAddressInput: false,
                  addressFormatted,
                  addressData
                })
              }}
            />
          </Col>
        </MobileTypeaheadContainer>
      )
    }

    return (
      <Container>
        <ScrollTracker
          onScroll25={() => {log(SELLER_LANDING_SCROLL_25)}}
          onScroll50={() => {log(SELLER_LANDING_SCROLL_50)}}
          onScroll75={() => {log(SELLER_LANDING_SCROLL_75)}}
          onScroll100={() => {log(SELLER_LANDING_SCROLL_100)}}
        />
        <Content>
          <Row justifyContent="center" px={[4, 0]}>
            <Col>
              <Text
                fontSize="xlarge"
                color="dark"
                fontWeight="bold"
                textAlign="center"
                style={{marginTop: 0}}>
                {this.props.title}
              </Text>
            </Col>
          </Row>
          <Row flexDirection={['column', 'row']} px={[4, 0]}>
            <Col width={[1, 10 / 12]} mr={[0, 2]}>
              {isMobile() ?
                <Col mb={4}>
                  <MobileAddressButton
                    onClick={this.openMobileAddressInput}
                    address={this.state.addressFormatted}
                  />
                </Col>
              :
                <Col mb={2} width={1}>
                  <AddressAutoComplete
                    defaultValue={this.state.address}
                    onClearInput={() => {}}
                    onSelectAddress={(addressFormatted, addressData) => {
                      this.setState({
                        addressFormatted,
                        addressData
                      })
                    }}
                  />
                </Col>
              }
            </Col>
            <Col width={[1, 2 / 12]} mb={[5, 0]}>
              <Button height="tall" active fluid onClick={() => {
                localStorage.removeItem('persist:step')
                if (this.state.addressFormatted && this.state.addressData) {
                  localStorage.setItem('sellerAddressFormatted', this.state.addressFormatted)
                  localStorage.setItem('sellerAddressData', JSON.stringify(this.state.addressData))
                }
                Router.push('/vender/imovel')
              }}>
                Avaliar
              </Button>
            </Col>
          </Row>
          <Row justifyContent="center">
            <Col>
              <Link passHref href="/">
                <a>
                  <UnderlinedText color="pink">Você quer comprar?</UnderlinedText>
                </a>
              </Link>
            </Col>
          </Row>
        </Content>
      </Container>
    )
  }
}
