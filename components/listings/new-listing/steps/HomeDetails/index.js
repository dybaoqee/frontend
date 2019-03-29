import React, { Component } from 'react'
import { Formik, Field } from 'formik'
import MaskedInput from 'react-text-mask'
import Input from '@emcasa/ui-dom/components/Input'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Text from '@emcasa/ui-dom/components/Text'
import Select from '@emcasa/ui-dom/components/Select'
import NavButtons from 'components/listings/new-listing/shared/NavButtons'
import Container from 'components/listings/new-listing/shared/Container'
import Steps from 'components/listings/new-listing/shared/Steps'
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
    this.validateType = this.validateType.bind(this)
    this.updateStateFromProps = this.updateStateFromProps.bind(this)
  }

  state = {
    type: null,
    area: null,
    maintenanceFee: null
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
        area: homeDetails.area,
        maintenanceFee: homeDetails.maintenanceFee
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
      return 'É necessário informar a área do imóvel.'
    }
    if (value < 0) {
      return 'Insira um valor positivo.'
    }
  }

  validateType(value) {
    if (!value || value === HOME_TYPES.placeholder) {
      return 'É necessário informar o tipo do imóvel.'
    }
  }

  render() {
    const { homeDetails } = this.props
    let type, area, maintenanceFee
    if (homeDetails) {
      type = homeDetails.type
      area = homeDetails.area
      maintenanceFee = homeDetails.maintenanceFee
    }
    const selectedHomeType = this.state.type !== null && this.state.type !== HOME_TYPES.placeholder

    return (
      <div ref={this.props.hostRef}>
        <Container>
          <Col width={[1,null,null,1/2]}>
            <Formik
              initialValues={{
                type: type,
                area: area,
                maintenanceFee: maintenanceFee
              }}
              isInitialValid={() => {
                return area !== null
              }}
              render={({isValid, setFieldTouched, setFieldValue, errors}) => (
                <>
                  <Steps currentStep="info" />
                  <Text
                    fontSize="large"
                    fontWeight="500"
                    textAlign="center">
                    De qual tipo de imóvel estamos falando?
                  </Text>
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
                        <Col width={1/2} mr={2}>
                          <Field
                            name="area"
                            validate={this.validateArea}
                            render={({form}) => (
                              <Input
                                label="Área conforme IPTU*"
                                placeholder="Área (m²)"
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
                        <Col width={1/2}>
                          <Field
                            name="maintenanceFee"
                            render={() =>
                              <MaskedInput
                                mask={currencyInputMask}
                                render={(ref, props) =>
                                  <Input
                                    {...props}
                                    label="Condomínio mensal"
                                    placeholder="Valor em R$"
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
        </Container>
      </div>
    )
  }
}

export default HomeDetails
