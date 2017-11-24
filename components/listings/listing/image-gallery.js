import React from 'react'

import { mobileMedia } from '../../../constants/media'

export default class ImageGallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imageIndex: 0
    }
  }

  showNextImage = () => {
    const { imageIndex } = this.state
    this.setState({ imageIndex: imageIndex + 1 })
  }

  showPreviousImage = () => {
    const { imageIndex } = this.state
    this.setState({ imageIndex: imageIndex - 1 })
  }

  render() {
    const { images } = this.props
    const imagesLength = images.length
    const { imageIndex } = this.state

    const indexToShow = Math.abs((imagesLength - imageIndex) % imagesLength)

    const imgSrc = process.env.REACT_APP_S3_BASE_URL + 'listings/original/' + images[indexToShow].filename

    return (
      <div>
        <img src={imgSrc} onClick={this.showPreviousImage} alt="Listing Main Pic"/>
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
