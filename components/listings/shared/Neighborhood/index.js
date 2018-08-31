import {Component} from 'react'
import Container, {Title, Info} from './styles'
import {Query} from 'react-apollo'
import {GET_NEIGHBORHOOD_DESCRIPTION} from 'graphql/listings/queries'

export default class Neighborhood extends Component {
  state = {
    opened: false
  }

  changeState = () => this.setState(({opened}) => ({opened: !opened}))

  render() {
    const {opened} = this.state
    const {
      neighborhood: nameSlug,
      state: stateSlug,
      city: citySlug
    } = this.props
    return (
      <Query
        query={GET_NEIGHBORHOOD_DESCRIPTION}
        variables={{nameSlug, stateSlug, citySlug}}
      >
        {({data}) => {
          if (!data.district) return null

          return (
            <Container>
              <Title onClick={this.changeState}>
                {!opened
                  ? 'Quer saber mais sobre esse bairro?'
                  : 'Fechar informações'}
              </Title>
              <Info opened={opened} onClick={this.changeState}>
                {data.district.description}
              </Info>
            </Container>
          )
        }}
      </Query>
    )
  }
}
