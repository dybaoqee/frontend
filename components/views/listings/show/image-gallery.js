import React from 'react'

import {imageUrl} from 'utils/image_url'

import Lightbox from 'components/shared/Lightbox'

export default class ImageGallery extends React.Component {
  render() {
    const {
      images,
      imageIndex,
      handleClose,
      handleNext,
      handlePrevious,
    } = this.props
    const imagesLength = images.length

    const indexToShow = Math.abs((imagesLength - imageIndex) % imagesLength)

    return (
      <Lightbox handleClose={handleClose}>
        {images.map(function(image, index) {
          const imgSrc = imageUrl(image.filename)
          const display = index == indexToShow ? 'block' : 'none'
          const style = {
            backgroundImage: `url(${imgSrc})`,
            display: display,
          }

          return <div key={index} className="image" style={style} />
        })}

        {imagesLength > 1 && (
          <div className="nav" onClick={handlePrevious}>
            ‹
          </div>
        )}
        {imagesLength > 1 && (
          <div className="nav" onClick={handleNext}>
            ›
          </div>
        )}

        <style jsx>{`
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
              background: linear-gradient(
                to right,
                rgba(0, 0, 0, 0.333),
                rgba(0, 0, 0, 0)
              );
            }
            &:last-of-type {
              float: right;
              justify-content: flex-end;
              text-align: right;
              &:hover {
                background: linear-gradient(
                  to left,
                  rgba(0, 0, 0, 0.333),
                  rgba(0, 0, 0, 0)
                );
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
        `}</style>
      </Lightbox>
    )
  }
}
