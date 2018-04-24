/*global Calendly:true*/
import {Component, Fragment} from 'react'
import Head from 'next/head'
import _ from 'lodash'

import {getInterestTypes} from 'services/interest-api'

import Popup from 'components/shared/Popup'
import Form from './styles'
import Select from 'react-select'
import EmCasaButton from 'components/shared/Common/Buttons'

export default class InterestForm extends Component {
  constructor(props) {
    super(props)

    const hours = _.range(8, 20).map((hour) => ({
      value: hour,
      label: `${hour < 10 ? '0' : ''}${hour}:00h`
    }))

    this.state = {
      interestType: '',
      interestTypes: [],
      fetching: false,
      error: null,
      showForm: false,
      hours,
      hour: hours[0]
    }
  }

  async componentWillMount() {
    this.setState({fetching: true})
    try {
      const typesFetched = await getInterestTypes()
      let interestTypes = typesFetched.data.data.map(({id, name}) => ({
        label: name,
        value: id
      }))
      interestTypes.push({label: 'Agendamento online', value: 5})
      this.setState({error: null, interestTypes, fetching: false})
    } catch (e) {
      this.setState({
        error: 'Ocorreu um erro ao carregar os dados. Tente novamente.',
        fetching: false
      })
    }
  }

  onChangeTypeSelect = (interestType) => {
    const {onChange} = this.props

    if (interestType.label === 'Agendamento online') {
      this.openCalendly()
      return
    }
    this.setState({interestType, showForm: true})
    onChange({
      target: {
        name: 'message',
        value: interestType.value === 2 ? 'Me ligue às 08:00h' : ''
      }
    })
    onChange({
      target: {
        name: 'interest_type_id',
        value: interestType.value
      }
    })
  }

  onChangeHoursSelect = (hour) => {
    const {onChange} = this.props
    this.setState({hour})
    onChange({
      target: {
        name: 'message',
        value: `Me ligue às ${hour.label}`
      }
    })
  }

  getTypesSelect = () => {
    const {interestType, interestTypes, error, fetching} = this.state
    if (fetching) return <p>Carregando...</p>

    return !error ? (
      <Select
        className="type"
        name="score"
        clearable={false}
        searchable={false}
        placeholder="Como fazemos?"
        noResultsText="Nenhum resultado encontrado"
        options={interestTypes}
        value={interestType}
        onChange={this.onChangeTypeSelect}
      />
    ) : (
      <p className="error">{error}</p>
    )
  }

  getForm = () => {
    const {data, onChange} = this.props
    const {name, email, phone, message} = data
    const {interestType, hours, hour} = this.state
    return (
      <Fragment>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          value={name}
          onChange={onChange}
          required
        />
        {interestType.value === 3 && (
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
            required
          />
        )}
        <input
          type="text"
          name="phone"
          placeholder="Telefone"
          value={phone}
          onChange={onChange}
          required
        />
        {interestType.value === 2 && (
          <Select
            className="type"
            clearable={false}
            searchable={false}
            placeholder="Selecione um horário"
            noResultsText="Nenhum resultado encontrado"
            options={hours}
            value={hour}
            onChange={this.onChangeHoursSelect}
          />
        )}
        {interestType.value === 3 && (
          <textarea
            name="message"
            placeholder="Mensagem (opcional)"
            value={message}
            onChange={onChange}
          />
        )}
        <EmCasaButton full>Enviar</EmCasaButton>
      </Fragment>
    )
  }

  openCalendly = () => {
    const {onSubmit} = this.props
    Calendly.showPopupWidget('https://calendly.com/em-casa')
    onSubmit(undefined, {
      name: 'Calendly',
      message:
        'Essa mensagem está sendo enviada porque algum usuário tentou agendar uma visita pelo Calendly neste imóvel'
    })
  }

  render() {
    const {handleClose, onSubmit} = this.props
    const {showForm} = this.state

    return (
      <Popup handleClose={handleClose}>
        <Head>
          <link
            href="https://assets.calendly.com/assets/external/widget.css"
            rel="stylesheet"
          />
          <script
            type="text/javascript"
            src="https://assets.calendly.com/assets/external/widget.js"
          />
        </Head>
        <h1>Marcar Visita</h1>
        <p>
          Escolha a melhor forma para<br />agendar sua visita ao imóvel:
        </p>

        <Form onSubmit={onSubmit}>
          {this.getTypesSelect()}
          {!showForm ? (
            <Fragment>
              <span>ou</span>
              <EmCasaButton
                type="button"
                secondary
                full
                onClick={this.openCalendly}
              >
                Agendamento online
              </EmCasaButton>
            </Fragment>
          ) : (
            this.getForm()
          )}
        </Form>
      </Popup>
    )
  }
}
