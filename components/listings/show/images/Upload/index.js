import {Component} from 'react'
import Dropzone from 'react-dropzone'
import request from 'superagent'

import Container from './styles'

const CLOUDINARY_UPLOAD_PRESET = 'emcasa-staging'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/emcasa/upload/'

export default class ImageUpload extends Component {
  onImageDrop = (files) => {
    const {handleImageUpload} = this

    files.map(function(file) {
      handleImageUpload(file)
    })
  }

  handleImageUpload = (file) => {
    const {onImageUploaded} = this.props

    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file)

    upload.end((err, response) => {
      if (response.body.secure_url !== '') {
        onImageUploaded(response)
      }
    })
  }

  render() {
    return (
      <Container>
        <Dropzone multiple={true} accept="image/*" onDrop={this.onImageDrop}>
          <p>Arraste uma imagem ou clique aqui para iniciar o upload.</p>
        </Dropzone>
      </Container>
    )
  }
}