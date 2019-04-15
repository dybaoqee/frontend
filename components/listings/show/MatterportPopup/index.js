import React, {Component} from 'react'
import Container from './styles'
import Matterport from 'components/listings/show/Matterport'

class MatterportPopup extends Component {
  render() {
    const {listing, isMatterportPopupVisible, closeMatterportPopup} = this.props

    return (
      <Container open={isMatterportPopupVisible}>
        <Matterport
          matterport_code={listing.matterportCode}
          handleClose={closeMatterportPopup}
          listingId={Number(listing.id)}
        />
      </Container>
    )
  }
}

export default MatterportPopup
