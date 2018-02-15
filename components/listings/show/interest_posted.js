import {Component} from 'react'

import Popup from 'components/popup'

export default class InterestPosted extends Component {
  render() {
    const {handleClose} = this.props

    return (
      <Popup handleClose={handleClose}>
        <h1>Agente EmCasa Notificado</h1>
        <p>
          Entraremos em contato o mais rápido possível para agendarmos uma
          visita!
        </p>
        <button onClick={handleClose}>Fechar</button>
      </Popup>
    )
  }
}
