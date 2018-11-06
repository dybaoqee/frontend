import React, { Component } from 'react'
import { Formik, Field } from 'formik'

import { TOUR_OPTIONS } from 'graphql/listings/queries'
import Button from '@emcasa/ui-dom/components/Button'
import Input from '@emcasa/ui-dom/components/Input'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import SelectCard from 'components/listings/new-listing/shared/SelectCard'
import { SchedulingButton } from './styles'

class Services extends Component {
  constructor(props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.skipStep = this.skipStep.bind(this)
    this.updateStateFromProps = this.updateStateFromProps.bind(this)

    this.getAvailableTimes = this.getAvailableTimes.bind(this)
    this.validateScheduling = this.validateScheduling.bind(this)
  }

  state = {
    wantsTour: false,
    wantsPictures: false,
    availableTimes: null,
    when: null,
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
    const { services } = props
    if (services) {
      this.setState({
        wantsTour: services.wantsTour,
        wantsPictures: services.wantsPictures
      })
    }
  }

  async getAvailableTimes() {
    this.setState({loading: true})
    try {
      const { data } = await apolloClient.query({
        query: TOUR_OPTIONS
      })
      this.setState({
        loading: false,
        error: null
      })
      const tourOptions = data.tourOptions.slice()
      this.nextStep(tourOptions.reverse())
    } catch (e) {
      console.log(e)
      this.setState({
        loading: false,
        error: 'Ocorreu um erro. Por favor, tente novamente.'
      })
    }
  }

  nextStep(data) {
    const { navigateTo, updateServices } = this.props
    updateServices({
      wantsTour: this.state.wantsTour,
      wantsPictures: this.state.wantsPictures,
      tourOptions: data
    })
    navigateTo('tour')
  }

  skipStep() {
    const { navigateTo } = this.props
    navigateTo('summary')
  }

  validateScheduling(value) {
    if (!value) {
      return true
    }
  }

  render() {
    const { services, scheduling } = this.props
    let wantsTour, wantsPictures, when
    if (services && scheduling) {
      wantsTour = services.wantsTour
      wantsPictures = services.wantsPictures
      when = scheduling.when
    }
    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center">
          <Col width={[1, 1/2]}>
            <Formik
              initialValues={{
                wantsTour,
                wantsPictures
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
                        checked={this.state.wantsTour}
                        onClick={() => {
                          this.setState({wantsTour: !this.state.wantsTour})
                        }}
                      />
                      <SelectCard
                        image="camera"
                        text="Quero Fotos Profissionais"
                        checked={this.state.wantsPictures}
                        onClick={() => {
                          this.setState({wantsPictures: !this.state.wantsPictures})
                        }}
                      />
                    </Row>
                    {(this.state.wantsTour || this.state.wantsPictures) &&
                      <>
                        <View><Text inline fontSize="small">Quando?</Text></View>
                        <SchedulingButton
                          fluid
                          onClick={this.getAvailableTimes}
                        >
                        00/00/0000 - entre 00h e 00h
                        </SchedulingButton>
                        <View><Text inline color="red">{this.state.error}</Text></View>
                      </>
                    }
                  </View>
                  <View bottom p={4}>
                    <Row justifyContent="space-between">
                      <Col width={5/12}>
                        <Button
                          fluid
                          height="tall"
                          onClick={this.skipStep}>Não quero</Button>
                      </Col>
                      <Col width={5/12}>
                        <Button
                          fluid
                          height="tall"
                          active
                          disabled={!isValid}
                          onClick={this.nextStep}>
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
