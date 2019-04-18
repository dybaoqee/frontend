import React, {createContext, Component} from 'react'
import PropTypes from 'prop-types'

export const FlagrContext = createContext()

export const FlagrConsumer = FlagrContext.Consumer

export default class FlagrProvider extends Component {
  constructor(props) {
    super(props)
    this.getContext = this.getContext.bind(this)
    this.renderInner = this.renderInner.bind(this)
  }

  render() {
    if (!this.props.children) return null

    return <FlagrContext.Consumer>{this.renderInner}</FlagrContext.Consumer>
  }

  renderInner(outerFlagrFlags) {
    const context = this.getContext(this.props.flagrFlags, outerFlagrFlags)

    return (
      <FlagrContext.Provider value={context}>
        {React.Children.only(this.props.children)}
      </FlagrContext.Provider>
    )
  }

  getFlagr(flagrFlags, outerFlagrFlags) {
    return {...outerFlagrFlags, ...flagrFlags}
  }

  getContext(flagrFlags, outerFlagr) {
    return this.getFlagr(flagrFlags, outerFlagr)
  }
}

FlagrProvider.propTypes = {
  flagrFlags: PropTypes.object.isRequired
}
