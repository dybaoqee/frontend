import React from 'react'

import Popup from 'components/popup'

export default class InterestPopup extends React.Component {
  render() {
    const {handleClose} = this.props

    return (
      <Popup handleClose={handleClose}>
        <h1>Marcar Visita</h1>
        <p>
          Insira seu nome, email e telefone com DDD e<br />entraremos em contato
          em minutos.
        </p>
        <h1>Form goes here</h1>
      </Popup>
    )
  }
}
