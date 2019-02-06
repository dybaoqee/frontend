import {Component} from 'react'
import PropTypes from 'prop-types'
import Lightbox from 'components/shared/Lightbox'
import {
  log,
  LISTING_DETAIL_MATTERPORT_OPEN,
  LISTING_DETAIL_MATTERPORT_CLOSE
} from 'lib/amplitude'

export default class Matterport extends Component {
  componentDidMount() {
    log(LISTING_DETAIL_MATTERPORT_OPEN, {listingId: this.props.listingId})
  }

  componentWillUnmount() {
    log(LISTING_DETAIL_MATTERPORT_CLOSE, {listingId: this.props.listingId})
  }

  render() {
    const {matterport_code, handleClose} = this.props
    const src = `https://my.matterport.com/show/?m=${matterport_code}&play=1`

    return (
      <Lightbox handleClose={handleClose}>
        <iframe
          width="100%"
          height="100%"
          src={src}
          frameBorder="0"
          allowFullScreen
        />
      </Lightbox>
    )
  }
}

Matterport.propTypes = {
  matterport_code: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  listingId: PropTypes.number.isRequired
}
