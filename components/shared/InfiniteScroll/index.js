import _ from 'lodash/fp'
import {Component} from 'react'
import Observer from '@researchgate/react-intersection-observer'
import Container, {Page, Button} from './styles'

const guard = (cond) => (fun) => (...args) => {
  if (cond(...args)) fun(...args)
}

const inView = _.flow([
  _.throttle(200),
  guard(({isIntersecting}) => isIntersecting)
])

export default class InfiniteScroll extends Component {
  static defaultProps = {
    threshold: '100px'
  }

  constructor(props) {
    super(props)
    const {currentPage} = props
    this.state = {
      currentPage
    }
  }

  onChange = (i) => inView(() => this.props.onChange(i))

  onNext = inView(() => this.props.onNext())

  renderPage = ([page, data]) => {
    const {children: render} = this.props
    return (
      <Page key={page}>
        <Observer onChange={this.onChange(page)}>
          <div>{data.map(render)}</div>
        </Observer>
      </Page>
    )
  }

  render() {
    const {pages, threshold, onNext} = this.props
    return (
      <Container>
        {Array.from(pages).map(this.renderPage)}
        <Observer
          onChange={this.onNext}
          rootMargin={`${threshold} 0px 0px 0px`}
        >
          <Button>Carregar Mais</Button>
        </Observer>
      </Container>
    )
  }
}
