import {Component} from 'react'
import _ from 'lodash'
import Container, {Footer, Title, Wrapper} from './styles'
import {getY, getX} from 'utils/polyfills/bounding-rect'
export default class InfiniteScroll extends Component {
  static defaultProps = {
    threshold: -35
  }

  state = {
    loading: false
  }

  footerRef = (el) => {
    this.footer = el
  }

  componentDidMount() {
    document.addEventListener('mousewheel', this.onScroll)
    document.addEventListener('touchmove', this.onScroll)
  }

  componentWillUnmount() {
    document.removeEventListener('mousewheel', this.onScroll)
    document.removeEventListener('touchmove', this.onScroll)
  }

  // Distance from the bottom of the viewport to the footer element
  get footerViewportDistance() {
    const {horizontal} = this.props
    if (!this.footer) return null
    const rect = this.footer.getBoundingClientRect()
    return (horizontal ? getX(rect) : getY(rect)) - window.innerHeight
  }

  shouldTriggerLoad = () => {
    const {threshold} = this.props
    const distance = this.footerViewportDistance
    return !isNaN(distance) && distance <= threshold
  }

  loadMore = async () => {
    const {onLoad} = this.props
    this.setState({loading: true})
    const loadedValues = await onLoad()
    this.setState({loading: false})
  }

  onScroll = _.throttle(() => {
    const {remaining_count} = this.props
    const {loading} = this.state
    const {onLoad} = this.props
    if (this.shouldTriggerLoad() && remaining_count > 0 && !loading && onLoad)
      this.loadMore()
  }, 500)

  render() {
    const {
      entries,
      title,
      remaining_count,
      horizontal,
      children: renderEntry
    } = this.props
    return (
      <Wrapper
        title={title}
        horizontal={horizontal}
        innerRef={(wrapper) => (this.wrapper = wrapper)}
      >
        {title && <Title horizontal={horizontal}>{title}</Title>}
        <Container horizontal={horizontal}>
          {entries.map(renderEntry)}
        </Container>
        {remaining_count > 0 && (
          <Footer
            className="infinite-scroll-footer"
            innerRef={this.footerRef}
            horizontal={horizontal}
          >
            <a
              onClick={() => !this.state.loading && this.loadMore()}
              title="Próxima página"
            >
              Carregando...
            </a>
          </Footer>
        )}
      </Wrapper>
    )
  }
}
