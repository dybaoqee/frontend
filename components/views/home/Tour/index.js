import {Component} from 'react'

import Container from './styles'

export default class HomeBuySell extends Component {
  render() {
    return (
      <Container>
        <h1>Conheça o nosso Tour Virtual</h1>
        <p>
          Nosso Tour 3D ajuda compradores a escolherem melhor quais imóveis
          visitar, economizando o tempo de todos envolvidos, e ajuda
          proprietários a atraírem mais atenção e venderem seus imóveis mais
          rapidamente.
        </p>

        <iframe
          width="100%"
          height="480"
          src="https://my.matterport.com/show/?m=SNpWfLUSZeC"
          frameBorder="0"
          allowFullScreen
        />
      </Container>
    )
  }
}
