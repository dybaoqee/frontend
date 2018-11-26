import React, { Component } from 'react'

import Col from '@emcasa/ui-dom/components/Col'
import AddressAutoComplete from 'components/shared/AddressAutoComplete'
import {
  MobieTypeaheadContainer
} from './styles'

class AddressInputMobile extends Component {
  constructor(props) {
    super(props)
    this.selectAddress = this.selectAddress.bind(this)
    this.close = this.close.bind(this)
  }

  state = {
    address: null
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
        <MobieTypeaheadContainer justifyContent="center" p={4}>
          <Col width={1}>
            <AddressAutoComplete
              onBackPressed={this.close}
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
        </MobieTypeaheadContainer>
      </div>
    )
  }
}

export default AddressInputMobile
