import {Component} from 'react'

import Popup from 'components/popup'

export default class InterestForm extends Component {
  render() {
    const {
      name,
      email,
      phone,
      message,
      onChange,
      handleClose,
      onSubmit,
    } = this.props

    return (
      <Popup handleClose={handleClose}>
        <h1>Marcar Visita</h1>
        <p>
          Insira seu nome, email e telefone com DDD e<br />entraremos em contato
          em minutos.
        </p>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={onChange}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Telefone"
            value={phone}
            onChange={onChange}
          />
          <textarea
            name="message"
            placeholder="Mensagem (opcional)"
            value={message}
            onChange={onChange}
          />
          <button type="submit">Enviar</button>
        </form>

        <style jsx>{`
          input[type='text'],
          textarea {
            border: 1px solid #ccc;
            border-radius: 4px;
            clear: both;
            display: block;
            font-size: 14px;
            max-width: calc(100% - 20px);
            margin: 0 auto 10px;
            padding: 10px;
            width: 350px;
          }
        `}</style>
      </Popup>
    )
  }
}
