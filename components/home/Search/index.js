import {Component} from 'react'
import EmCasaButton from 'components/shared/Common/Buttons'
import Popup from 'components/shared/Popup'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSearch from '@fortawesome/fontawesome-pro-light/faSearch'
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'
import Router from 'next/router'
import _ from 'lodash'
import {pickerMobileMedia} from 'constants/media'

import * as filterOptions from 'constants/listing-filter-options'

import Container, {
  Search,
  Neighborhoods,
  Neighborhood,
  NeighborhoodsOptions,
  Magnifier,
  Title
} from './styles'

export default class HomeSearch extends Component {
  state = {
    opened: false,
    neighborhoods: []
  }

  neighborhoodChosen = (e) => {
    const {target: {value, checked}} = e
    const {neighborhoods: selected} = this.state
    const neighborhoods = checked
      ? _.union([value], selected)
      : _.remove(selected, (actualValue) => actualValue !== value)
    this.setState({neighborhoods})
  }

  componentDidMount() {
    Router.prefetch('/listings')
  }

  searchListings = (e) => {
    const {neighborhoods} = this.state
    const {href, as} = this.buildLink()
    window.dataLayer.push({
      action: 'User Search Home Page',
      search: neighborhoods.join('|'),
      event: 'search_home'
    })
    e.preventDefault()
    Router.push(href, as)
  }

  buildLink = () => {
    const {neighborhoods} = this.state
    const params = `bairros=${neighborhoods.join('|')}`

    if (neighborhoods.length) {
      return {href: `/listings/index?${params}`, as: `/imoveis?${params}`}
    } else {
      return {href: '/listings/index', as: '/imoveis'}
    }
  }

  handlePopup = (open) => {
    this.setState({opened: open === false ? false : true})
  }

  render() {
    const {neighborhoods, opened} = this.state
    const neighborhoodOptions = filterOptions.neighborhoodOptions(
      this.props.neighborhoods
    )

    return (
      <Container>
        <h1>Encontre o Imóvel Perfeito para Você no Rio de Janeiro</h1>

        <Search>
          <Neighborhoods onClick={this.handlePopup}>
            {neighborhoods.length === 0
              ? 'Selecione os bairros'
              : neighborhoods.length > 1
                ? `${neighborhoods[0]} e mais ${neighborhoods.length - 1}`
                : neighborhoods[0]}
          </Neighborhoods>
          {opened && (
            <Popup
              handleClose={this.handlePopup}
              hideClose
              full
              media={pickerMobileMedia}
            >
              <Title>Selecione os bairros</Title>
              <NeighborhoodsOptions onSubmit={this.searchListings}>
                {neighborhoodOptions.map(({value, label}) => (
                  <Neighborhood
                    key={value}
                    checked={
                      _.filter(
                        neighborhoods,
                        (neighborhood) => neighborhood === value
                      ).length > 0
                    }
                  >
                    <label>{label}</label>
                    <input
                      checked={
                        _.filter(
                          neighborhoods,
                          (neighborhood) => neighborhood === value
                        ).length > 0
                      }
                      onChange={this.neighborhoodChosen}
                      type="checkbox"
                      name="neighborhood"
                      value={value}
                    />
                    <FontAwesomeIcon icon={faCheck} />
                  </Neighborhood>
                ))}
                <EmCasaButton type="submit">Enviar</EmCasaButton>
              </NeighborhoodsOptions>
            </Popup>
          )}
          <Magnifier onClick={this.searchListings}>
            <FontAwesomeIcon icon={faSearch} />
            <span>Buscar</span>
          </Magnifier>
        </Search>
      </Container>
    )
  }
}
