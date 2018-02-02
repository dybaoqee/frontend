import React from 'react'

import {imageUrl} from 'utils/image_url'
import {mobileMedia} from 'constants/media'

export default class ImageGallery extends React.Component {
  render() {
    const {images, imageIndex, handleHide, handleNext, handlePrevious} = this.props
    const imagesLength = images.length

    const indexToShow = Math.abs((imagesLength - imageIndex) % imagesLength)
    const imgFilename = (imagesLength > 0) ? images[indexToShow].filename : 'default.jpg'

    const imgSrc = imageUrl(imgFilename)

    return (
      <div className="container">
        {images.map(function(image, index) {
          const imgSrc = imageUrl(image.filename)
          const display = (index == indexToShow) ? 'block' : 'none';
          const style = {
            backgroundImage: `url(${imgSrc})`,
            display: display,
          }

          return <div key={index} className="image" style={style}/>
        })}

        <button onClick={handleHide}>
          ×
        </button>

        {(imagesLength > 1) && <div className="nav" onClick={handlePrevious}>‹</div>}
        {(imagesLength > 1) && <div className="nav" onClick={handleNext}>›</div>}

        <style jsx>{`
          div.container {
            background-color: rgba(0, 0, 0, 0.85);
            height: 100vh;
            left: 0;
            max-width: 100vw;
            position: fixed;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
            top: 0;
            width: 100vw;
            z-index: 9;
          }

          div.nav {
            align-items: center;
            display: flex;
            color: white;
            cursor: pointer;
            float: left;
            font-size: 60px;
            height: 100%;
            padding: 0 30px;
            user-select: none;
            width: calc(50% - 60px);
            z-index: 10;
            &:hover {
              background: linear-gradient(to right, rgba(0, 0, 0, .333), rgba(0, 0, 0, 0));
            }
            &:last-of-type {
              float: right;
              justify-content: flex-end;
              text-align: right;
              &:hover {
                background: linear-gradient(to left, rgba(0, 0, 0, .333), rgba(0, 0, 0, 0));
              }
            }
          }

          div.image {
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
            position: absolute;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            z-index: -1;
          }

          button {
            box-shadow: none;
            color: white;
            background: transparent;
            font-size: 48px;
            font-weight: 300;
            line-height: .8em;
            padding: 12px 20px 20px;
            position: absolute;
            right: 10px;
            top: 10px;
            z-index: 3;
            &:hover {
              background: rgba(255, 255, 255, 0.1);
            }
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
