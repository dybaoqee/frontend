export const mainListingImage = (images) => {
  const filename = (images.length > 0) ? images[0].filename : 'default.jpg'
  const isCloudinary = (images.length > 0) ? images[0].is_cloudinary : false
  return imageUrl(filename, isCloudinary)
}

export const mainListingThumbnail = (images) => {
  const filename = (images.length > 0) ? images[0].filename : 'default.jpg'
  const isCloudinary = (images.length > 0) ? images[0].is_cloudinary : false
  return thumbnailUrl(filename, isCloudinary)
}

export const imageUrl = (filename, isCloudinary) => {
  return isCloudinary ?
    process.env.REACT_APP_CLOUDINARY_BASE_URL + '/v1513818385/' + filename :
    process.env.REACT_APP_S3_BASE_URL + '/listings/original/' + filename
}

export const thumbnailUrl = (filename, isCloudinary) => {
  return isCloudinary ?
    process.env.REACT_APP_CLOUDINARY_BASE_URL + '/c_fit,h_400,w_600/v1513818385/' + filename :
    process.env.REACT_APP_S3_BASE_URL + '/listings/small/' + filename
}

