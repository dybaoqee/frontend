import React, { Component } from 'react'
import { Formik, Field } from 'formik'
import MaskedInput from 'react-text-mask'

import Input from '@emcasa/ui-dom/components/Input'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import Select from '@emcasa/ui-dom/components/Select'
import NavButtons from 'components/listings/new-listing/shared/NavButtons'
import { currencyInputMask } from 'utils/text-utils'

const HOME_TYPES = {
  house: 'house',
  apartment: 'apartment',
  penthouse: 'penthouse'
}

class HomeDetails extends Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.validateArea = this.validateArea.bind(this)
    this.validateIptu = this.validateIptu.bind(this)
    this.validateHomeType = this.validateHomeType.bind(this)
    this.updateStateFromProps = this.updateStateFromProps.bind(this)
  }

  state = {
    homeType: null,
    floor: null,
    area: null,
    cond: null,
    iptu: null
  }

  componentDidMount() {
    this.updateStateFromProps(this.props)
  }

  componentWillReceiveProps(props) {
    this.updateStateFromProps(props)
  }

  updateStateFromProps(props) {
    const { homeDetails } = props
    if (homeDetails) {
      this.setState({
        homeType: homeDetails.homeType,
        floor: homeDetails.floor,
        area: homeDetails.area,
        cond: homeDetails.cond,
        iptu: homeDetails.iptu
      })
    }
  }

  nextStep() {
    const { navigateTo, updateHomeDetails } = this.props
    updateHomeDetails(this.state)
    navigateTo('bedrooms')
  }

  previousStep() {
    const { navigateTo } = this.props
    navigateTo('addressInput')
  }

  validateArea(value) {
    if (!value) {
      return "É necessário informar a área do imóvel."
    }
  }

  validateIptu(value) {
    if (!value) {
      return "É necessário informar o valor do IPTU do imóvel."
    }
  }

  validateHomeType(value) {
    if (!value || value === '_placeholder') {
      return "É necessário informar o tipo do imóvel."
    }
  }

  render() {
    const { homeDetails } = this.props
    let homeType, floor, area, cond, iptu
    if (homeDetails) {
      homeType = homeDetails.homeType
      floor = homeDetails.floor
      area = homeDetails.area
      cond = homeDetails.cond
      iptu = homeDetails.iptu
    }
    const isHouse = this.state.homeType === HOME_TYPES.house
    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center">
          <Col width={[1, 1/2]}>
            <Formik
              initialValues={{
                homeType: homeType,
                floor: floor,
                area: area,
                cond: cond,
                iptu: iptu
              }}
              isInitialValid={() => {
                return area !== null && iptu !== null
              }}
              render={({isValid, setFieldTouched, setFieldValue, errors}) => (
                <>
                  <View body p={4}>
                    <Text
                      fontSize="large"
                      fontWeight="bold"
                      textAlign="center">
                      Por favor, informe os detalhes do seu imóvel
                    </Text>
                    <Text color="grey">Com base nos detalhes do seu imóvel, calcularemos um valor médio de venda.</Text>
                    <Col mb={4}>
                      <Field
                        name="homeType"
                        validate={this.validateHomeType}
                        render={() => (
                          <Select
                            defaultValue={homeType || '_placeholder'}
                            error={errors.homeType}
                            onChange={(e) => {
                              const { value } = e.target
                              setFieldValue('homeType', value)
                              setFieldTouched('homeType')
                              this.setState({homeType: value})
                            }}>
                            <option value="_placeholder" disabled>Tipo do Imóvel*</option>
                            <option value={HOME_TYPES.house}>Casa</option>
                            <option value={HOME_TYPES.apartment}>Apartamento</option>
                            <option value={HOME_TYPES.penthouse}>Cobertura</option>
                          </Select>
                        )}/>
                    </Col>
                    <Row mb={4}>
                      {!isHouse && <Col width={1/2} mr={4}>
                        <Field
                          name="floor"
                          render={() => (
                            <Input
                              placeholder="Nº andar"
                              type="number"
                              error={errors.floor}
                              defaultValue={floor}
                              disabled={this.state.homeType === HOME_TYPES.house}
                              onChange={(e) => {
                                const { value } = e.target
                                setFieldValue('floor', value)
                                this.setState({floor: value})
                              }}
                            />
                          )}/>
                      </Col>
                      }
                      <Col width={1/2} ml={isHouse ? 0 : 2} mr={4}>
                        <Field
                          name="area"
                          validate={this.validateArea}
                          render={({form}) => (
                            <Input
                              label="Área conforme IPTU*"
                              placeholder="Área (m²)*"
                              type="number"
                              error={form.touched.area ? errors.area : null}
                              defaultValue={area}
                              onChange={(e) => {
                                const { value } = e.target
                                setFieldValue('area', value)
                                setFieldTouched('area')
                                this.setState({area: value})
                              }}
                              />
                          )}/>
                      </Col>
                      {isHouse && <Col width={1/2} ml={2} mr={4}></Col>}
                    </Row>
                    <Row mb={4}>
                      <Col width={1/2} mr={4}>
                        <Field
                          name="cond"
                          render={() => (
                            <MaskedInput
                              mask={currencyInputMask}
                              render={(ref, props) =>
                                <Input
                                  {...props}
                                  hideLabelView
                                  placeholder="Cond (R$)"
                                  error={errors.cond}
                                  defaultValue={cond}
                                  onChange={(e) => {
                                    const { value } = e.target
                                    setFieldValue('cond', value)
                                    this.setState({cond: value})
                                  }}
                                  ref={(input) => ref(input)}
                                />
                              }
                            />
                          )}/>
                      </Col>
                      <Col width={1/2} ml={2} mr={4}>
                        <Field
                          name="iptu"
                          validate={this.validateIptu}
                          render={({form}) => (
                            <MaskedInput
                              mask={currencyInputMask}
                              render={(ref, props) =>
                                <Input
                                  {...props}
                                  hideLabelView
                                  placeholder="IPTU (R$/ano)*"
                                  error={form.touched.iptu ? errors.iptu : null}
                                  defaultValue={iptu}
                                  onChange={(e) => {
                                    const { value } = e.target
                                    setFieldValue('iptu', value)
                                    setFieldTouched('iptu')
                                    this.setState({iptu: value})
                                  }}
                                  ref={(input) => ref(input)}
                                />
                              }
                            />
                          )}/>
                      </Col>
                    </Row>
                  </View>
                  <View bottom p={4}>
                    <NavButtons
                      previousStep={this.previousStep}
                      onSubmit={this.nextStep}
                      submitEnabled={isValid}
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

export default HomeDetails
