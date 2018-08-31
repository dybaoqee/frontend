import {Component} from 'react'
import Container, {Title, Info} from './styles'
import {Query} from 'react-apollo'
import {GET_NEIGHBORHOODS_DESCRIPTION} from 'graphql/listings/queries'

export default class Neighborhood extends Component {
  state = {
    opened: false
  }

  changeState = () => this.setState(({opened}) => ({opened: !opened}))

  render() {
    const {opened} = this.state
    const {neighborhood} = this.props
    return (
      <Query query={GET_NEIGHBORHOODS_DESCRIPTION}>
        {({data}) => {
          if (!data.districts) return null
          const description = data.districts.filter(
            ({name}) => name === neighborhood
          )[0].description

          return (
            <Container>
              <Title onClick={this.changeState}>
                {!opened
                  ? 'Quer saber mais sobre esse bairro?'
                  : 'Fechar informações'}
              </Title>
              <Info opened={opened} onClick={this.changeState}>
                {description}
              </Info>
            </Container>
          )
        }}
      </Query>
    )
  }
}
