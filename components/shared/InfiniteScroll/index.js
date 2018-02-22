import _ from 'lodash/fp'
import {Component} from 'react'

import Container, {Footer} from './styles'

export default class InfiniteScroll extends Component {
  static defaultProps = {
    threshold: 2000
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
  }

  renderPage = ([page, data]) => {
    const {children: render} = this.props
    return (
      <li key={page}>
        <div>{data.map(render)}</div>
      </li>
    )
  }

  footerRef = (el) => {
    this.footer = el
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
