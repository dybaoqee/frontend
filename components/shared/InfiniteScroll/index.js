import {Component} from 'react'
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

  onLoad = () => {
    const {onLoad, currentPage} = this.props
    onLoad(currentPage + 1)
  }

  renderPage = (page) => {
    const {children: render} = this.props
    const data = this.props.pages[page]
    return (
      <Page key={page}>
        {data.map((node) => render(node, page))}
      </Page>
    )
  }

  render() {
    const {pages} = this.props
    return (
      <Container>
        {Object.keys(pages).map(this.renderPage)}
        <Button>Carregar Mais</Button>
      </Container>
    )
  }
}
