import {Component} from 'react'
import Matterport from 'components/shared/Matterport'
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
        <Matterport code={'ZFZ3x24RbHP'} />
      </Container>
    )
  }
}
