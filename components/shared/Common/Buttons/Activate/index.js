import {Component} from 'react'
import Router from 'next/router'
import Container from './styles'
import {Mutation} from 'react-apollo'
import Select from 'react-select'
import {ACTIVATE_LISTING, DEACTIVATE_LISTING} from 'graphql/listings/mutations'

export default class ActivateListing extends Component {
  constructor(props) {
    super(props)
    const options = [{label: 'Ativo', value: 0}, {label: 'Inativo', value: 1}]

    this.state = {
      values: options,
      status: props.listing.is_active ? options[0] : options[1]
    }
  }

  onChangeStatus = (mutation) => {
    const {listing: {id}} = this.props
    mutation({
      variables: {
        id
      }
    })
  }

  onMutationSuccess

  render() {
    const {listing: {is_active, id}} = this.props
    const {values, status} = this.state
    return (
      <Mutation
        mutation={!is_active ? ACTIVATE_LISTING : DEACTIVATE_LISTING}
        onCompleted={() => Router.push(`/imoveis/${id}`)}
      >
        {(activateListing) => (
          <Container>
            <Select
              name="activate"
              clearable={false}
              searchable={false}
              placeholder="Status do imóvel"
              noResultsText="Nenhum resultado encontrado"
              options={values}
              value={status}
              onChange={this.onChangeStatus.bind(this, activateListing)}
            />
          </Container>
        )}
      </Mutation>
    )
  }
}
