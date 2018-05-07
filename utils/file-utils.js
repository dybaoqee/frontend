export const downloadBlob = (blob, filename, mimeType) => {
  // It is necessary to create a new blob object with mime-type explicitly set
  // otherwise only Chrome works like it should
  var newBlob = new Blob([blob], {type: mimeType})

  // IE doesn't allow using a blob object directly as link href
  // instead it is necessary to use msSaveOrOpenBlob
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(newBlob)
    return
  }

  //For other browsers:
  // Create a link pointing to the ObjectURL containing the blob.
  const data = window.URL.createObjectURL(newBlob)
  var a = document.createElement('a')
  a.href = data
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
