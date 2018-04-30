import {imageUrl} from 'utils/image_url'
import Lightbox from 'components/shared/Lightbox'
import Container from './styles'

export default ({
  images,
  imageIndex,
  handleClose,
  handleNext,
  handlePrevious
}) => {
  const imagesLength = images.length

  const indexToShow = Math.abs((imagesLength - imageIndex) % imagesLength)

  return (
    <Container>
      <Lightbox handleClose={handleClose}>
        {images.map(function(image, index) {
          const imgSrc = imageUrl(image.filename)
          const display = index == indexToShow ? 'block' : 'none'
          const style = {
            backgroundImage: `url(${imgSrc})`,
            display: display
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
      </Lightbox>
    </Container>
  )
}
