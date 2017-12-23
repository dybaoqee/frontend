import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'

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
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveImage: PropTypes.func.isRequired,
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
        <div style={{ ...imgStyle, opacity }}>
          <Icon icon="trash" />
          <style jsx>{`
            div {
              background-position: center;
              background-repeat: no-repeat;
              background-size: contain;
              cursor: move;
              width: 100%;
              height: 140px;
            }
          `}</style>
        </div>
      )
    )
  }
}

