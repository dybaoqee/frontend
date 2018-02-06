import { Component } from 'react'
import Dropzone from 'react-dropzone'
import request from 'superagent'

const CLOUDINARY_UPLOAD_PRESET = 'emcasa-staging'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/emcasa/upload/'

export default class ImageUpload extends React.Component {
  onImageDrop(files) {
    this.handleImageUpload(files[0])
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                         .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                         .field('file', file)

    upload.end((err, response) => {
      if (err) {
        console.error(err)
      }

      if (response.body.secure_url !== '') {
        this.props.onImageUploaded(response);
      }
    })
  }

  render() {
    return <div>
      <div className="FileUpload">
        <Dropzone
          multiple={false}
          accept="image/*"
          onDrop={this.onImageDrop.bind(this)}>
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
  }
}
