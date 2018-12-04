import {Component} from 'react'
import throttle from 'lodash/throttle'
import {getY, getX} from 'utils/polyfills/bounding-rect'
import { FadeLoader } from 'react-spinners'
import Row from '@emcasa/ui-dom/components/Row'
import theme from '@emcasa/ui'
import {
  Container,
  ListContainer,
  Footer,
} from './styles'

class ListingInfiniteScroll extends Component {
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

  onScroll = throttle(() => {
    const {remaining_count} = this.props
    const {loading} = this.state
    const {onLoad} = this.props
    if (this.shouldTriggerLoad() && remaining_count > 0 && !loading && onLoad)
      this.loadMore()
  }, 500)

  render() {
    const {
      entries,
      titleComponent,
      remaining_count,
      horizontal,
      children: renderEntry
    } = this.props
    return (
      <Container
        style={{position: 'relative'}}
        innerRef={(wrapper) => (this.wrapper = wrapper)}
      >
        {titleComponent && !horizontal && titleComponent}
        <ListContainer>
          {entries.map(renderEntry)}
        </ListContainer>
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
            <Row justifyContent="center">
              <FadeLoader
                width={10}
                height={10}
                margin={2}
                radius={8}
                color={theme.colors.pink}
              />
            </Row>
            </a>
          </Footer>
        )}
      </Container>
    )
  }
}

export default ListingInfiniteScroll
