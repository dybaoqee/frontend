import {Component} from 'react'
import Link from 'next/link'
import {canEdit} from 'permissions/listings-permissions'
import ListingTable from '../Table'
import Container from './styles'

export default class TextContainer extends Component {
  truncateDescription = () => {
    const {id, description} = this.props.listing

    if (!description) return

    var re = description.match(/^.{0,160}[\S]*/)
    var l = re[0].length
    var re = re[0].replace(/\s$/, '')
    if (l < description.length) {
      re = re + '…'
    }

    return re
  }

  render() {
    const {listing, currentUser} = this.props
    const {id} = listing

    return (
      <Container>
        <div className="description">
          {this.truncateDescription()}{' '}
          <Link href={`/listings/show?id=${id}`} as={`/imoveis/${id}`}>
            Saiba Mais →
          </Link>
        </div>

        <ListingTable listing={listing} />

        <div className="link-container">
          {canEdit(currentUser, listing) && (
            <Link href={`/listings/edit?id=${id}`} as={`/imoveis/${id}/editar`}>
              <a className="btn gray cancel-listing-nav">Editar</a>
            </Link>
          )}

          <Link href={`/listings/show?id=${id}`} as={`/imoveis/${id}`}>
            <a className="btn">Ver Detalhes</a>
          </Link>
        </div>
      </Container>
    )
  }
}
