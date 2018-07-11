import {Component} from 'react'
import ListingTable from '../Table'
import Container from './styles'
import LikeButton from 'components/shared/Common/Buttons/Like'

export default class TextContainer extends Component {
  truncateDescription = () => {
    const {description} = this.props.listing

    if (!description) return

    var re = description.match(/^.{0,230}[S]*/)
    var l = re[0].length
    re = re[0].replace(/\s$/, '')
    if (l < description.length) {
      re = re + '…'
    }

    return re
  }

  render() {
    const {listing, resumedInfo, loading, favorite, currentUser} = this.props

    return (
      <Container resumedInfo={resumedInfo}>
        <div className="header">
          <div className="address">
            <p>{listing.address.street}</p>
            <span>{listing.address.neighborhood}</span>
          </div>
          {!loading && (
            <LikeButton
              favorite={favorite}
              listing={listing}
              user={currentUser}
              secondary
            />
          )}
        </div>
        <div className="description">
          {this.truncateDescription()}
          <span>Saiba Mais →</span>
        </div>

        <ListingTable listing={listing} resumedInfo={resumedInfo} />
      </Container>
    )
  }
}
