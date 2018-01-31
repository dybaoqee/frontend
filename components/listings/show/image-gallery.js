import React from 'react'

import { imageUrl } from 'utils/image_url'
import { mobileMedia } from 'constants/media'
import {desktopHeaderHeight} from 'constants/dimensions'

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
    const imgFilename = (imagesLength > 0) ? images[indexToShow].filename : 'default.jpg'

    const imgSrc = imageUrl(imgFilename)

    return (
      <div className="container">
        { (imagesLength > 1) &&<div onClick={this.showPreviousImage}>‹</div> }
        { (imagesLength > 1) && <div onClick={this.showNextImage}>›</div> }
        <style jsx>{`
          div.container {
            background-color: #f0f0f0;
            background-image: url(${imgSrc});
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            height: calc(100vh - ${desktopHeaderHeight + 240}px);
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
            max-width: 100vw;
            width: 100vw;
          }

          div > div {
            align-items: center;
            display: flex;
            color: white;
            cursor: pointer;
            float: left;
            font-size: 60px;
            height: 100%;
            padding: 0 30px;
            width: calc(50% - 60px);
          }

          div > div:hover {
            background: linear-gradient(to right, rgba(0, 0, 0, .333), rgba(0, 0, 0, 0));
          }

          div > div:last-of-type {
            float: right;
            justify-content: flex-end;
            text-align: right;
          }

          div > div:last-of-type:hover {
            background: linear-gradient(to left, rgba(0, 0, 0, .333), rgba(0, 0, 0, 0));
          }
          @media ${mobileMedia} {
            div.container {
              height: 300px;
            }

            div {
              width: 100vw;
            }
          }
        `}</style>
      </div>
    )
  }
}
