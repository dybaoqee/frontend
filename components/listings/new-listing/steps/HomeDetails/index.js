import React, { Component } from 'react'
import { Formik, Field } from 'formik'

import Button from '@emcasa/ui-dom/components/Button'
import Input from '@emcasa/ui-dom/components/Input'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import Select from '@emcasa/ui-dom/components/Select'

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
              render={({isValid, dirty, setFieldValue, errors}) => (
                <>
                  <View body p={4}>
                    <Text
                      fontSize="large"
                      fontWeight="bold"
                      textAlign="center"
                    >
                      Por favor, informe os detalhes do seu imóvel
                    </Text>
                    <Text color="grey">Com base nos detalhes do seu imóvel, calcularemos um valor médio de venda.</Text>
                    <Col mb={4}>
                      <Field
                        name="homeType"
                        validate={this.validateHomeType}
                        render={({field}) => (
                          <Select
                            defaultValue={homeType || '_placeholder'}
                            error={errors.homeType}
                            onChange={(e) => {
                              const { value } = e.target
                              setFieldValue('homeType', value)
                              this.setState({homeType: value})
                            }}>
                            <option value="_placeholder" disabled>Tipo do Imóvel*</option>
                            <option value="house">Casa</option>
                            <option value="apartment">Apartamento</option>
                          </Select>
                        )}/>
                    </Col>
                    <Row mb={4}>
                      <Col width={1/2} mr={4}>
                        <Field
                          name="floor"
                          render={() => (
                            <Input
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
                      <Col width={1/2} ml={2} mr={4}>
                        <Field
                          name="area"
                          validate={this.validateArea}
                          render={() => (
                            <Input
                              label="Área conforme IPTU*"
                              placeholder="Área (m²)*"
                              type="number"
                              error={errors.area}
                              defaultValue={area}
                              onChange={(e) => {
                                const { value } = e.target
                                setFieldValue('area', value)
                                this.setState({area: value})
                              }}
                              />
                          )}/>
                      </Col>
                    </Row>
                    <Row mb={4}>
                      <Col width={1/2} mr={4}>
                        <Field
                          name="cond"
                          render={() => (
                            <Input
                              placeholder="Cond (R$)"
                              error={errors.cond}
                              defaultValue={cond}
                              onChange={(e) => {
                                const { value } = e.target
                                setFieldValue('cond', value)
                                this.setState({cond: value})
                              }}/>
                          )}/>
                      </Col>
                      <Col width={1/2} ml={2} mr={4}>
                        <Field
                          name="iptu"
                          validate={this.validateIptu}
                          render={() => (
                            <Input
                              placeholder="IPTU (R$/ano)*"
                              error={errors.iptu}
                              defaultValue={iptu}
                              onChange={(e) => {
                                const { value } = e.target
                                setFieldValue('iptu', value)
                                this.setState({iptu: value})
                              }}/>
                          )}/>
                      </Col>
                    </Row>
                  </View>
                  <View bottom p={4}>
                    <Row justifyContent="space-between">
                      <Col width={5/12}>
                        <Button
                          fluid
                          height="tall"
                          onClick={this.previousStep}>Voltar</Button>
                      </Col>
                      <Col width={5/12}>
                        <Button
                          fluid
                          height="tall"
                          disabled={dirty && !isValid}
                          onClick={this.nextStep}>Avançar</Button>
                      </Col>
                    </Row>
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
