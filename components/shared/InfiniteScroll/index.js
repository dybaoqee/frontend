import _ from 'lodash'
import {Component} from 'react'
import Link from 'next/link'

import Container, {Footer} from './styles'
import {withRouter} from 'next/router'

@withRouter
export default class InfiniteScroll extends Component {
  static defaultProps = {
    threshold: 2000,
    to: {}
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

  get nextPageHref() {}

  render() {
    const {
      to,
      entries,
      currentPage,
      totalPages,
      children: renderEntry
    } = this.props
    const last = currentPage >= totalPages
    const query = to.query || {}
    return (
      <Container>
        {entries.map(renderEntry)}
        {!last && (
          <Link href={{...to, query: {page: currentPage + 1, ...query}}}>
            <a title="Próxima página">
              <Footer innerRef={this.footerRef}>Carregando...</Footer>
            </a>
          </Link>
        )}
      </Container>
    )
  }
}
