import React, { Component } from 'react'
import { Formik, Field } from 'formik'
import moment from 'moment'

import { TOUR_OPTIONS } from 'graphql/listings/queries'
import Button from '@emcasa/ui-dom/components/Button'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import SelectCard from 'components/listings/new-listing/shared/SelectCard'
import { SchedulingButton } from './styles'

class Services extends Component {
  constructor(props) {
    super(props)
    this.tourStep = this.tourStep.bind(this)
    this.skipStep = this.skipStep.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.updateStateFromProps = this.updateStateFromProps.bind(this)

    this.getAvailableTimes = this.getAvailableTimes.bind(this)
    this.validateScheduling = this.validateScheduling.bind(this)
  }

  state = {
    wantsTour: false,
    wantsPictures: false,
    availableTimes: null,
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
      this.tourStep(tourOptions.reverse())
    } catch (e) {
      this.setState({
        loading: false,
        error: 'Ocorreu um erro. Por favor, tente novamente.'
      })
    }
  }

  tourStep(data) {
    const { navigateTo, updateServices } = this.props
    updateServices({
      wantsTour: this.state.wantsTour,
      wantsPictures: this.state.wantsPictures,
      tourOptions: data
    })
    navigateTo('tour')
  }

  skipStep() {
    const { navigateTo, updateServices } = this.props
    updateServices({
      wantsTour: false,
      wantsPictures: false
    })
    navigateTo('summary')
  }

  nextStep() {
    this.props.navigateTo('summary')
  }

  validateScheduling(value) {
    if (value && (this.state.wantsPictures ||  this.state.wantsTour)) {
      return false
    }
    return true
  }

  render() {
    const { services, tour } = this.props
    let wantsTour, wantsPictures
    if (services) {
      wantsTour = services.wantsTour
      wantsPictures = services.wantsPictures
    }
    let when
    if (tour && tour.day && tour.time) {
      const date = moment(tour.day).format('DD/MM/YYYY')
      when = `${date} - às ${tour.time}h`
    }
    return (
      <div ref={this.props.hostRef}>
        <Row justifyContent="center" p={4}>
          <Col width={[1, 1/2]}>
            <Formik
              initialValues={{
                wantsTour,
                wantsPictures
              }}
              isInitialValid={() => {
                return !(this.validateScheduling(when))
              }}
              render={({isValid}) => (
                <>
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
                        color={when ? 'dark' : 'grey'}
                      >
                      {when ? when : '00/00/0000 - entre 00h e 00h'}
                      </SchedulingButton>
                      <View><Text inline color="red">{this.state.error}</Text></View>
                    </>
                  }
                  <Row justifyContent="space-between" mt={4}>
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
