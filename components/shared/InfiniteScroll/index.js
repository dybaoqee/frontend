import {Component} from 'react'
import Observer from '@researchgate/react-intersection-observer'
import Container, {Page, Button} from './styles'

export default class InfiniteScroll extends Component {
  constructor(props) {
    super(props)
    const {currentPage} = props
    this.state = {
      currentPage
    }
  }

  componentDidMount() {
    // Load default page
    if (!this.props.children.length) {
      this.props.onLoad()
    }
  }

  onChange = (i) => () => this.props.onChange(i)

  renderPage = ([page, data]) => {
    const {children: render} = this.props
    return (
      <Page key={page}>
        {data.map(render)}
      </Page>
    )
  }

  render() {
    const {pages, onNext} = this.props
    return (
      <Container>
        {Array.from(pages).map(this.renderPage)}
        <Observer>
          <Button onClick={onNext}>Carregar Mais</Button>
        </Observer>
      </Container>
    )
  }
}
