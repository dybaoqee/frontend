import _ from 'lodash'
import {Component} from 'react'

import Container, {Footer} from './styles'

export default class InfiniteScroll extends Component {
  static defaultProps = {
    threshold: 2000
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }

  // Distance from the bottom of the viewport to the footer element
  get footerViewportDistance() {
    if (!this.footer) return null
    const rect = this.footer.getBoundingClientRect()
    return rect.y - window.innerHeight
  }

  shouldTriggerLoad = () => {
    const {threshold} = this.props
    const distance = this.footerViewportDistance
    return !isNaN(distance) && Math.abs(distance) <= threshold
  }

  onScroll = _.throttle(() => {
    const {onLoad} = this.props
    if (this.shouldTriggerLoad()) onLoad()
  }, 500)

  footerRef = (el) => {
    this.footer = el
  }

  render() {
    const {
      entries,
      threshold,
      currentPage,
      totalPages,
      children: renderEntry
    } = this.props
    const last = currentPage >= totalPages

    return (
      <Container>
        {entries.map(renderEntry)}
        {!last && <Footer innerRef={this.footerRef}>Carregando...</Footer>}
      </Container>
    )
  }
}
