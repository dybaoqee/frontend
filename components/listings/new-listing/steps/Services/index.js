import React, { Component } from 'react'
import { Formik, Field } from 'formik'

import Button from '@emcasa/ui-dom/components/Button'
import Input from '@emcasa/ui-dom/components/Input'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import SelectCard from 'components/listings/new-listing/shared/SelectCard'

class Services extends Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.skipStep = this.skipStep.bind(this)
    this.schedule = this.schedule.bind(this)
    this.updateStateFromProps = this.updateStateFromProps.bind(this)

    this.validateScheduling = this.validateScheduling.bind(this)
  }

  state = {
    tour: false,
    photos: false,
    when: null
  }

  componentDidMount() {
    this.updateStateFromProps(this.props)
  }

  componentWillReceiveProps(props) {
    this.updateStateFromProps(props)
  }

  updateStateFromProps(props) {
    const { services } = props
    if (services) {
      this.setState({
        tour: services.tour,
        photos: services.photos
      })
    }
  }

  nextStep() {
    const { navigateTo, updateServices } = this.props
    updateServices(this.state)
  }

  skipStep() {

  }

  schedule() {
    const { navigateTo, updateServices } = this.props
    updateServices(this.state)
    navigateTo('scheduling')
  }

  validateScheduling(value) {
    if (!value) {
      return true
    }
  }

  render() {
    const { services, scheduling } = this.props
    let tour, photos, when
    if (services && scheduling) {
      tour = services.tour
      photos = services.photos
      when = scheduling.when
    }
    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center">
          <Col width={[1, 1/2]}>
            <Formik
              initialValues={{
                tour,
                photos
              }}
              isInitialValid={() => {
                return !(this.validateScheduling(when))
              }}
              render={({isValid, setFieldTouched, setFieldValue, errors}) => (
                <>
                  <View body p={4}>
                    <Text
                      fontSize="large"
                      fontWeight="bold"
                      textAlign="center">
                      Quer impulsionar seu imóvel?
                    </Text>
                    <Text color="grey">Fazemos um Tour Virtual 3D do seu imóvel e também tiramos fotos com qualidade profissional sem custo nenhum. Diga-nos aqui qual o melhor horário pra você:</Text>
                    <Row justifyContent="space-around" flexWrap="wrap">
                      <SelectCard
                        image="tour"
                        text="Quero o Tour Virtual 3D"
                        checked={this.state.tour}
                        onClick={() => {
                          this.setState({tour: !this.state.tour})
                        }}
                      />
                      <SelectCard
                        image="camera"
                        text="Quero Fotos Profissionais"
                        checked={this.state.photos}
                        onClick={() => {
                          this.setState({photos: !this.state.photos})
                        }}
                      />
                    </Row>
                  </View>
                  <View bottom p={4}>
                    <Row justifyContent="space-between">
                      <Col width={5/12}>
                        <Button
                          fluid
                          height="tall"
                          onClick={this.props.skipStep}>Não quero</Button>
                      </Col>
                      <Col width={5/12}>
                        <Button
                          fluid
                          height="tall"
                          active
                          disabled={!isValid}
                          onClick={this.props.nextStep}>
                          Agendar
                        </Button>
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

export default Services
