import {Component} from 'react'
import _ from 'lodash'
import Container, {Footer, Title, Wrapper} from './styles'
import {getY, getX} from 'utils/polyfills/bounding-rect'
export default class InfiniteScroll extends Component {
  static defaultProps = {
    threshold: 10
  }

  footerRef = (el) => {
    this.footer = el
  }

  componentDidMount() {
    document.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll)
  }

  // Distance from the bottom of the viewport to the footer element
  get footerViewportDistance() {
    const {mapOpenedOnMobile} = this.props
    if (!this.footer) return null
    const rect = this.footer.getBoundingClientRect()
    return (mapOpenedOnMobile ? getX(rect) : getY(rect)) - window.innerHeight
  }

  shouldTriggerLoad = () => {
    const {threshold} = this.props
    const distance = this.footerViewportDistance
    return !isNaN(distance) && distance <= threshold
  }

  onScroll = _.throttle(() => {
    const {onLoad, remaining_count} = this.props
    if (this.shouldTriggerLoad()) {
      !_.isUndefined(remaining_count)
        ? remaining_count > 0 && onLoad && onLoad()
        : onLoad && onLoad()
    }
  }, 500)

  render() {
    const {
      entries,
      title,
      remaining_count,
      mapOpenedOnMobile,
      children: renderEntry,
      onLoad,
      loading
    } = this.props
    return (
      <Wrapper
        title={title}
        mapOpenedOnMobile={mapOpenedOnMobile}
        innerRef={(wrapper) => (this.wrapper = wrapper)}
      >
        {title && <Title mapOpenedOnMobile={mapOpenedOnMobile}>{title}</Title>}
        <Container mapOpenedOnMobile={mapOpenedOnMobile}>
          {entries.map(renderEntry)}
        </Container>
        {remaining_count > 0 && (
          <Footer
            className="infinite-scroll-footer"
            innerRef={this.footerRef}
            mapOpenedOnMobile={mapOpenedOnMobile}
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
