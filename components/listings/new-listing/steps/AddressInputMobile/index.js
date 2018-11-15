import React, { Component } from 'react'

import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import Input from '@emcasa/ui-dom/components/Input'
import AddressAutoComplete from 'components/listings/new-listing/shared/AddressAutoComplete'

class AddressInputMobile extends Component {
  constructor(props) {
    super(props)
    this.selectAddress = this.selectAddress.bind(this)
    this.close = this.close.bind(this)
  }

  state = {
    address: null
  }

  componentDidMount() {
    // TODO: hide header
  }

  selectAddress(addressFormatted, addressData) {
    this.props.updateLocation({
      address: addressFormatted,
      addressData
    })
    this.close()
  }

  close() {
    const { navigateTo } = this.props
    navigateTo('addressInput')
  }

  render() {
    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center" p={4}>
          <Col width={[1, 1/2]} mr={4}>
            <AddressAutoComplete
              defaultValue={this.state.address}
              onClearInput={this.onClearInput}
              onSelectAddress={(addressFormatted, addressData) => {
                this.setState({
                  address: addressFormatted
                })
                this.selectAddress(addressFormatted, addressData)
              }}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default AddressInputMobile
