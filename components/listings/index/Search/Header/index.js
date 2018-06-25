import {Component} from 'react'
import Container from './styles'

export default class FilterHeader extends Component {
  isActiveRange = (prop) => {
    const param = this.props.params[prop]
    const visible = this.props.visible.indexOf(prop) !== -1
    return visible || param.min || param.max
  }

  isActiveList = (prop) => {
    const param = this.props.params[prop]
    const visible = this.props.visible.indexOf(prop) !== -1
    return visible || (param && param.length)
  }

  isAreaActive = () => this.isActiveRange('area')
  isPriceActive = () => this.isActiveRange('price')
  isRoomsActive = () => this.isActiveRange('rooms')
  isGarageSpotsActive = () => this.isActiveRange('garageSpots')
  isNeighborhoodsActive = () => this.isActiveList('neighborhoods')
  isOtherActive = () =>
    this.isActiveRange('rooms') || this.isActiveRange('area')

  render() {
    const {onToggle, onReset} = this.props

    return (
      <Container>
        <span className="filter-title">Filtros</span>

        <div className="mobile-control-container">
          <button
            className={
              'mobile-filter-toggler ' +
              (this.isNeighborhoodsActive() ? 'active' : '')
            }
            onClick={onToggle('neighborhoods')}
          >
            Bairros
          </button>

          <button
            className={
              'mobile-filter-toggler ' + (this.isPriceActive() ? 'active' : '')
            }
            onClick={onToggle('price')}
          >
            Preço
          </button>

          <button
            className={
              'mobile-filter-toggler ' + (this.isOtherActive() ? 'active' : '')
            }
            onClick={onToggle('rooms', 'area', 'garageSpots')}
          >
            Outros
          </button>

          <span className="mobile remove-all-filters" onClick={onReset}>
            Limpar
          </span>
        </div>
      </Container>
    )
  }
}
