import {Component} from 'react'

import Lightbox from 'components/lightbox'

export default class Matterport extends Component {
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
