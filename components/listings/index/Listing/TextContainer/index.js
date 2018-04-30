import Link from 'next/link'
import {canEdit} from 'permissions/listings-permissions'
import ListingTable from '../Table'
import Container from './styles'

export default ({listing, listing: {id, description}, currentUser}) => (
  <Container>
    <div className="description">{description}</div>

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
