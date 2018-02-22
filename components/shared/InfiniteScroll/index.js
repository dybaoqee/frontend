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

  onScroll = _.throttle((e) => {
    if (!this.footer) return
    const {threshold, onLoad} = this.props
    const rect = this.footer.getBoundingClientRect()
    // Distance from the bottom of the viewport to the footer element
    const distance = rect.y - window.innerHeight
    if (Math.abs(distance) <= threshold) onLoad()
  }, 500)

  footerRef = (el) => {
    this.footer = el
  }

  renderPage = ([page, data]) => {
    const {children: render} = this.props
    return (
      <li key={page}>
        <div>{data.map(render)}</div>
      </li>
    )
  }

  render() {
    const {pages, threshold, currentPage, totalPages} = this.props
    const last = currentPage >= totalPages
    return (
      <Container>
        {Array.from(pages).map(this.renderPage)}
        {!last && <Footer innerRef={this.footerRef}>Carregando...</Footer>}
      </Container>
    )
  }
}
