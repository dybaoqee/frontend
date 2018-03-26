import {Component} from 'react'
import ReactGA from 'react-ga'
import EmCasaButton from 'components/shared/Common/Buttons'
import Popup from 'components/shared/Popup'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'
import Link from 'next/link'
import Router from 'next/router'
import _ from 'lodash'

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
  }

  handleNeighborhoodChange = (selectedOption) => {
    this.updateSelectedOption(selectedOption, 'bairros')
  }

  }

  }

  buildLink = () => {
    const params = this.treatParams()

    if (params) {
      return {href: `/listings/index?${params}`, as: `/imoveis?${params}`}
    } else {
      return {href: '/listings/index', as: '/imoveis'}
    }
  }

  handleClick = () => {
    ReactGA.initialize(process.env.GOOGLE_ANALYTICS_TRACKING_ID)
    ReactGA.event({
      category: 'Search',
      label: 'User search from Home',
      action: 'homeSearch'
    })
  }

  render() {
    const {bairros} = this.state
    const {neighborhoods} = this.props
    const neighborhoodOptions = filterOptions.neighborhoodOptions(neighborhoods)
    const {href, as} = this.buildLink()

    return (
      <Container>
        <h1>Encontre o Imóvel Perfeito para Você no Rio de Janeiro</h1>

        <Search>
          <Neighborhoods>
            <Select
              name="form-field-name"
              arrowRenderer={null}
              placeholder="Bairro"
              value={bairros}
              onChange={this.handleNeighborhoodChange}
              options={neighborhoodOptions}
              noResultsText="Não Encontramos Resultado"
            />
          </Neighborhoods>
          <Link href={href} as={as} prefetch>
            <Magnifier onClick={this.handleClick}>
              <FontAwesomeIcon icon={faSearch} />
            </Magnifier>
          </Link>
          <Link href={href} as={as}>
            <MobileMagnifier onClick={this.handleClick}>
              Ver Imóveis →
            </MobileMagnifier>
          </Link>
        </Search>
      </Container>
    )
  }
}
