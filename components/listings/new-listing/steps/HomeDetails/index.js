import React, { Component } from 'react'
import { Formik, Field } from 'formik'
import MaskedInput from 'react-text-mask'

import Input from '@emcasa/ui-dom/components/Input'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import Select from '@emcasa/ui-dom/components/Select'
import NavButtons from 'components/listings/new-listing/shared/NavButtons'
import {
  currencyInputMask,
  currencyToInt
} from 'utils/text-utils'
import { HOME_TYPES } from './constants'

class HomeDetails extends Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.validateArea = this.validateArea.bind(this)
    this.validatePropertyTax = this.validatePropertyTax.bind(this)
    this.validateType = this.validateType.bind(this)
    this.updateStateFromProps = this.updateStateFromProps.bind(this)
  }

  state = {
    type: null,
    floor: null,
    area: null,
    maintenanceFee: null,
    propertyTax: null
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
        type: homeDetails.type,
        floor: homeDetails.floor,
        area: homeDetails.area,
        maintenanceFee: homeDetails.maintenanceFee,
        propertyTax: homeDetails.propertyTax
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

  validatePropertyTax(value) {
    if (!value) {
      return "É necessário informar o valor do IPTU do imóvel."
    }
  }

  validateType(value) {
    if (!value || value === HOME_TYPES.placeholder) {
      return "É necessário informar o tipo do imóvel."
    }
  }

  render() {
    const { homeDetails } = this.props
    let type, floor, area, maintenanceFee, propertyTax
    if (homeDetails) {
      type = homeDetails.type
      floor = homeDetails.floor
      area = homeDetails.area
      maintenanceFee = homeDetails.maintenanceFee
      propertyTax = homeDetails.propertyTax
    }
    const selectedHomeType = this.state.type !== null && this.state.type !== HOME_TYPES.placeholder
    const showFloorNumber = this.state.type !== null && this.state.type !== HOME_TYPES.house

    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center" p={4}>
          <Col width={[1, 1/2]}>
            <Formik
              initialValues={{
                type: type,
                floor: floor,
                area: area,
                maintenanceFee: maintenanceFee,
                propertyTax: propertyTax
              }}
              isInitialValid={() => {
                return area !== null && propertyTax !== null
              }}
              render={({isValid, setFieldTouched, setFieldValue, errors}) => (
                <>
                  <Text
                    fontSize="large"
                    fontWeight="bold"
                    textAlign="center">
                    Por favor, informe os detalhes do seu imóvel
                  </Text>
                  <Text color="grey">Com base nos detalhes do seu imóvel, calcularemos um valor médio de venda.</Text>
                  <Col mb={4}>
                    <Field
                      name="type"
                      validate={this.validateType}
                      render={() => (
                        <Select
                          defaultValue={type || HOME_TYPES.placeholder}
                          error={errors.type}
                          onChange={(e) => {
                            const { value } = e.target
                            setFieldValue('type', value)
                            setFieldTouched('type')
                            this.setState({type: value})
                          }}>
                          <option value={HOME_TYPES.placeholder} disabled>Tipo do Imóvel*</option>
                          <option value={HOME_TYPES.house}>Casa</option>
                          <option value={HOME_TYPES.apartment}>Apartamento</option>
                          <option value={HOME_TYPES.penthouse}>Cobertura</option>
                        </Select>
                      )}/>
                  </Col>
                  {selectedHomeType &&
                    <>
                      <Row mb={4}>
                        <Col width={1/2}>
                          <Field
                            name="area"
                            validate={this.validateArea}
                            render={({form}) => (
                              <Input
                                label="Área conforme IPTU"
                                placeholder="Área (m²)*"
                                type="number"
                                error={form.touched.area ? errors.area : null}
                                defaultValue={area}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value)
                                  setFieldValue('area', value)
                                  setFieldTouched('area')
                                  this.setState({area: value})
                                }}
                                />
                            )}/>
                        </Col>
                        <Col width={1/2} ml={2}>
                          <Field
                            name="propertyTax"
                            validate={this.validatePropertyTax}
                            render={({form}) =>
                              <MaskedInput
                                mask={currencyInputMask}
                                render={(ref, props) =>
                                  <Input
                                    {...props}
                                    label="Valor do IPTU anual"
                                    placeholder="IPTU (R$/ano)*"
                                    error={form.touched.propertyTax ? errors.propertyTax : null}
                                    defaultValue={propertyTax}
                                    type="tel"
                                    ref={(input) => ref(input)}
                                    onChange={(e) => {
                                      const value = currencyToInt(e.target.value)
                                      setFieldValue('propertyTax', value)
                                      setFieldTouched('propertyTax')
                                      this.setState({propertyTax: value})
                                    }}
                                  />
                                }
                              />
                            }/>
                        </Col>
                      </Row>
                      <Row>
                        <Col width={1/2} mb={1}><Text inline fontSize="small">Valor mensal do condomínio</Text></Col>
                        <Row alignItems="flex-end" width={1/2}><Col width={1} ml={2} mb={1}><Text inline fontSize="small">Nº andar</Text></Col></Row>
                      </Row>
                      <Row mb={4}>
                        <Col width={showFloorNumber ? 1/2 : 1}>
                          <Field
                            name="maintenanceFee"
                            render={() =>
                              <MaskedInput
                                mask={currencyInputMask}
                                render={(ref, props) =>
                                  <Input
                                    {...props}
                                    hideLabelView
                                    placeholder="Cond (R$)"
                                    error={errors.maintenanceFee}
                                    defaultValue={maintenanceFee}
                                    type="tel"
                                    ref={(input) => ref(input)}
                                    onChange={(e) => {
                                      const value = currencyToInt(e.target.value)
                                      setFieldValue('maintenanceFee', value)
                                      this.setState({maintenanceFee: value})
                                    }}
                                  />
                                }
                              />
                            }/>
                        </Col>
                        {showFloorNumber && (
                          <Col width={1/2} ml={2}>
                            <Field
                              name="floor"
                              render={() => (
                                <Input
                                  hideLabelView
                                  placeholder="Nº andar"
                                  type="number"
                                  error={errors.floor}
                                  defaultValue={floor}
                                  onChange={(e) => {
                                    const { value } = e.target
                                    setFieldValue('floor', value)
                                    this.setState({floor: value})
                                  }}
                                />
                              )}/>
                          </Col>
                        )}
                      </Row>
                    </>
                  }
                  <NavButtons
                    previousStep={this.previousStep}
                    onSubmit={this.nextStep}
                    submitEnabled={isValid}
                  />
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
