import React, { Component } from 'react'
import { Formik, Field } from 'formik'

import { ADDRESS_IS_COVERED } from 'graphql/listings/queries'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import Input from '@emcasa/ui-dom/components/Input'
import AddressAutoComplete from 'components/listings/new-listing/shared/AddressAutoComplete'
import StaticMap from 'components/listings/new-listing/shared/StaticMap'
import NavButtons from 'components/listings/new-listing/shared/NavButtons'
import { getAddressInput } from 'lib/address'

class AddressInput extends Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.updateLocation = this.updateLocation.bind(this)
    this.checkAddressCoverage = this.checkAddressCoverage.bind(this)
    this.validateAddress = this.validateAddress.bind(this)
    this.updateStateFromProps = this.updateStateFromProps.bind(this)
    this.onClearInput = this.onClearInput.bind(this)
  }

  state = {
    address: null,
    complement: null,
    addressData: null,
    loading: false,
    error: null
  }

  componentDidMount() {
    this.updateStateFromProps(this.props)
  }

  componentWillReceiveProps(props) {
    this.updateStateFromProps(props)
  }

  updateStateFromProps(props) {
    const { location } = props
    if (location) {
      this.setState({
        address: location.address,
        complement: location.complement,
        addressData: location.addressData,
      })
    }
  }

  updateLocation() {
    const { updateLocation } = this.props
    updateLocation({
      address: this.state.address,
      complement: this.state.complement,
      addressData: this.state.addressData
    })
  }

  onClearInput() {
    this.setState({
      address: null,
      addressData: null
    })
  }

  nextStep() {
    const { navigateTo } = this.props
    navigateTo('homeDetails')
  }

  previousStep() {
    const { navigateTo } = this.props
    navigateTo('intro')
  }

  async checkAddressCoverage() {
    this.setState({loading: true})

    const input = getAddressInput(this.state.addressData)
    try {
      const { data } = await apolloClient.query({
        query: ADDRESS_IS_COVERED,
        variables: {
          city: input.city,
          neighborhood: input.neighborhood,
          state: input.state
        }
      })

      this.setState({loading: false})
      this.updateLocation()
      const { addressIsCovered } = data
      if (addressIsCovered) {
        this.nextStep()
      } else {
        const { navigateTo } = this.props
        navigateTo('notifyCoverage')
      }

    } catch (e) {
      this.setState({
        loading: false,
        error: 'Ocorreu um erro ao validar o endereço. Por favor, tente novamente.'
      })
    }
  }

  validateAddress(value) {
    if (!value) {
      return 'É necessário preencher um endereço'
    }
  }

  render() {
    const { location } = this.props
    let address, complement, addressData
    if (location) {
      address = location.address
      complement = location.complement
      addressData = location.addressData
    }
    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center">
          <Col width={[1, 1/2]}>
            <Formik
              initialValues={{
                address: address,
                complement: complement
              }}
              isInitialValid={() => {
                return !(this.validateAddress(address))
              }}
              render={({isValid, setFieldValue, errors}) => (
                <>
                  <View body p={4}>
                    <Text
                      fontSize="large"
                      fontWeight="bold"
                      textAlign="center">
                      Qual o endereço do seu imóvel?
                    </Text>
                    <Col>
                      <StaticMap addressData={this.state.addressData} />
                    </Col>
                    <Col mb={4} mr={4}>
                      <Field
                        name="address"
                        validate={this.validateAddress}
                        render={() => (
                          <AddressAutoComplete
                            defaultValue={address}
                            onClearInput={this.onClearInput}
                            onSelectAddress={(addressFormatted, addressData) => {
                              setFieldValue('address', addressFormatted)
                              this.setState({
                                address: addressFormatted,
                                addressData: addressData
                              })
                            }}
                          />
                        )}/>
                    </Col>
                    <Col mr={4}>
                    <Field
                      name="complement"
                      render={() => (
                        <Input
                          hideLabelView
                          hideErrorView
                          placeholder="Complemento"
                          defaultValue={complement}
                          onChange={(e) => {
                            const { value } = e.target
                            setFieldValue('complement', value)
                            this.setState({complement: value})
                          }}
                        />
                      )} />
                    </Col>
                  </View>
                  <View bottom p={4}>
                    <NavButtons
                      previousStep={this.previousStep}
                      onSubmit={() => {
                        this.checkAddressCoverage()
                      }}
                      submitEnabled={isValid}
                      loading={this.state.loading}
                    />
                  </View>
                </>
              )}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default AddressInput
