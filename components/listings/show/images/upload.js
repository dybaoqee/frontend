import {Component} from 'react'
import Dropzone from 'react-dropzone'
import request from 'superagent'

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
      <div>
        <div className="FileUpload">
          <Dropzone multiple={true} accept="image/*" onDrop={this.onImageDrop}>
            <p>Arraste uma imagem ou clique aqui para iniciar o upload.</p>
          </Dropzone>
        </div>

        <style jsx>{`
          .FileUpload {
            clear: both;
            :global(div) {
              align-items: center;
              display: flex;
              height: 80px !important;
              margin-bottom: 20px;
              justify-content: center;
              width: calc(100% - 4px) !important;
            }
          }
        `}</style>
      </div>
    )
  }
}
