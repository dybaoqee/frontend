import {Component} from 'react'
import {Marker} from 'react-gmaps'

export default class AppMarker extends Component {
  rootRef = (ref) => {
    this.root = ref
  }

  render() {
    return <Marker ref={this.rootRef} {...this.props} />
  }
}
