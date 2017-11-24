import React from 'react'

import { mobileMedia } from '../../../constants/media'

export default class ImageGallery extends React.Component {
  render() {
    const { images } = this.props

    return (
      <div>
        <img src={process.env.REACT_APP_S3_BASE_URL + 'listings/original/' + images[0].filename} alt="Listing Main Pic"/>
        <style jsx>{`
          img {
            max-width: 100vw;
            width: 787px;
          }

          @media ${mobileMedia} {
            img {
              width: 100vw;
            }
          }
        `}</style>
      </div>
    )
  }
}
