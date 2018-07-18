import {Component} from 'react'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import Container, {
  Tiles,
  Tile,
  ContainerDropZone,
  UploadWarning
} from 'components/listings/show/images/Upload/styles'
import EmCasaButton from 'components/shared/Common/Buttons'

const CLOUDINARY_UPLOAD_PRESET = 'emcasa-staging'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/emcasa/upload/'

export default class ImageUpload extends Component {
  state = {
    uploading: false,
    filesUploaded: 0,
    files: 0
  }
  onImageDrop = (files) => {
    this.setState({files: files.length, uploading: true})
    const {handleImageUpload} = this

    files.map(function(file) {
      handleImageUpload(file)
    })
  }

  handleImageUpload = (file) => {
    const {onImageUploaded} = this.props
    const {filesUploaded, files} = this.state

    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file)

    upload.end((err, response) => {
      if (response.body.secure_url !== '') {
        this.setState({
          filesUploaded: filesUploaded + 1,
          uploading: filesUploaded === files ? false : true
        })
        onImageUploaded(response)
      }
    })
  }

  render() {
    const {uploading, filesUploaded, files} = this.state
    return (
      <ContainerDropZone>
        <Dropzone multiple={true} accept="image/*" onDrop={this.onImageDrop}>
          {this.props.children ? (
            this.props.children
          ) : (
            <Container>
              <Tiles>
                <Tile />
                <Tile />
                <Tile />
                <Tile />
                <Tile />
                <Tile />
              </Tiles>
              <EmCasaButton secondary>
                Clique aqui ou arraste suas fotos
              </EmCasaButton>
            </Container>
          )}
        </Dropzone>
        {uploading && (
          <UploadWarning>
            <p>{`Subindo foto ${filesUploaded + 1} de ${files}`}</p>
            <p>Aguarde, por favor...</p>
          </UploadWarning>
        )}
      </ContainerDropZone>
    )
  }
}
