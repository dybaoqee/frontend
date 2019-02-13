export const mainListingImage = (images) => {
  const filename = images.length > 0 ? images[0].filename : 'default_w4ki8j'
  return imageUrl(filename)
}

export const mainListingThumbnail = (images) => {
  const filename = images.length > 0 ? images[0].filename : 'default_w4ki8j'
  return thumbnailUrl(filename)
}

export const imageUrl = (filename) => {
  return (
    process.env.REACT_APP_CLOUDINARY_BASE_URL +
    '/f_auto/v1513818385/' +
    filename
  )
}

export const thumbnailUrl = (filename, width = 600, height = 400) => {
  return (
    process.env.REACT_APP_CLOUDINARY_BASE_URL +
    `/f_auto,c_fit,h_${height},w_${width}/v1513818385/` +
    filename
  )
}
