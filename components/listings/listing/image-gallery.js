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
      <div className="container">
        { (imagesLength > 1) &&<div onClick={this.showPreviousImage}>‹</div> }
        { (imagesLength > 1) && <div onClick={this.showNextImage}>›</div> }
        <style jsx>{`
          div.container {
            background-color: #f0f0f0;
            background-image: url(${imgSrc});
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
            height: 590px;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
            max-width: 100vw;
            width: 787px;
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
            div {
              width: 100vw;
            }
          }
        `}</style>
      </div>
    )
  }
}
