import { Component } from 'react'
import PropTypes from 'prop-types'

class ScrollTracker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scroll25: false,
      scroll50: false,
      scroll75: false,
      scroll100: false
    }
    this.onScroll = this.onScroll.bind(this)
  }

  onScroll() {
    if (!process.browser) {
      return
    }
    const { scrollY, innerHeight } = window
    const { scrollHeight } = document.body
    const height = scrollHeight - innerHeight // total document height
    if (scrollY >= height * 0.25 && !this.state.scroll25) {
      this.setState({scroll25: true}, this.props.onScroll25)
    } else if (scrollY >= height * 0.50 && !this.state.scroll50) {
      this.setState({scroll50: true}, this.props.onScroll50)
    } else if (scrollY >= height * 0.75 && !this.state.scroll75) {
      this.setState({scroll75: true}, this.props.onScroll75)
    } else if (scrollY >= height && !this.state.scroll100) {
      this.setState({scroll100: true}, this.props.onScroll100)
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }

  render() {
    return null
  }
}

ScrollTracker.propTypes = {
  onScroll25: PropTypes.func,
  onScroll50: PropTypes.func,
  onScroll75: PropTypes.func,
  onScroll100: PropTypes.func,
}

export default ScrollTracker
