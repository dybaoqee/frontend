import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'

import { deleteListingImage } from '../../../../services/listing-images-api'
import DraggableTypes from '../../../../constants/draggable_types'
import Icon from '../../../../components/icon'
import { thumbnailUrl } from '../../../../utils/image_url'

const imageSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    }
  }
}

const imageTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Time to actually perform the action
    props.moveImage(dragIndex, hoverIndex)

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex
  }
}

@DropTarget(DraggableTypes.IMAGE, imageTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(DraggableTypes.IMAGE, imageSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class DraggableImage extends Component {
  static PropTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    id: PropTypes.any.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    jwt: PropTypes.string,
    listingId: PropTypes.number.isRequired,
    moveImage: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
  }

  handleImageDelete = async () => {
    const isImageDeletedFromWebservice = await this.deleteImageFromWebService()
    if (isImageDeletedFromWebservice) {
      this.props.onImageDeleted(this.props)
    } else {
      console.error('Erro ao deletar imagem do banco.');
    }
  }

  deleteImageFromWebService = async () => {
    const { image, listingId, jwt } = this.props

    const res = await deleteListingImage(listingId, image.id, jwt)

    if (res.data.errors) {
      this.setState({errors: res.data.errors})
      return
    }

    if (res.status === 204) {
      return true
    }

    return res.status
  }

  render() {
    const {
      image, isDragging, connectDragSource, connectDropTarget
    } = this.props
    const imgUrl = thumbnailUrl(image.filename, image.is_cloudinary)
    const imgStyle = { backgroundImage: `url(${imgUrl})` }
    const opacity = isDragging ? 0 : 1

    return connectDragSource(
      connectDropTarget(
        <div style={{ ...imgStyle, opacity }} onClick={this.handleImageDelete}>
          <div className="trash">
            <Icon icon="trash" />
          </div>

          <style jsx>{`
            div {
              align-items: center;
              background-position: center;
              background-repeat: no-repeat;
              background-size: contain;
              cursor: move;
              display: flex;
              height: 140px;
              justify-content: flex-end;
              width: 100%;

              > div.trash {
                cursor: pointer;
                margin-right: 20px;
                :global(svg) {
                  fill: red;
                }
              }
            }
          `}</style>
        </div>
      )
    )
  }
}

