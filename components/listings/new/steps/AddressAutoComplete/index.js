import React from 'react'
import {Title, Input, Field} from '../../shared/styles'
import {SearchResults} from './styles'
import ErrorContainer from 'components/listings/new/shared/ErrorContainer'

export default class AddressAutoComplete extends React.Component {
  constructor(props) {
    super(props)
    this.timer = null
    this.state = {
      predictions: [],
      place: {},
      search: '',
      errors: [],
      loadingPlaceInfo: false
    }
  }

  searchPlaces = async (input) => {
    try {
      const response = await fetch(`/maps/autocomplete?q=${encodeURI(input)}`)
      const json = await response.json()
      this.setState({predictions: json.json.predictions})
    } catch (e) {
      throw new Error(e)
    }
  }

  async setPlace(place) {
    const {choosePlace} = this.props
    this.setState({place, predictions: [], loadingPlaceInfo: true, errors: []})
    try {
      const response = await fetch(
        `/maps/placeDetail?q=${encodeURI(place.place_id)}`
      )
      const json = await response.json()
      choosePlace(json.json.result)
    } catch (e) {
      this.setState({
        errors: [
          ...this.state.errors,
          'Ocorreu um erro ao buscar informações sobre o endereço. Tente novamente'
        ]
      })
    }

    this.setState({loadingPlaceInfo: false})
  }

  onChange = (e) => {
    const {value} = e.target
    this.setState({search: value, place: {}})
    clearTimeout(this.timer)

    this.timer = setTimeout(this.searchPlaces.bind(null, value), 500)
  }
  render() {
    const {predictions, place, search, loadingPlaceInfo, errors} = this.state

    return (
      <div>
        <Title>Onde fica o seu imóvel?</Title>
        <Field>
          <label htmlFor="street">Endereço</label>
          <Input
            type="text"
            name="street"
            value={place.description || search}
            placeholder="Coloque seu endereço aqui"
            onChange={this.onChange}
          />
          <SearchResults>
            {predictions.map((prediction) => (
              <div
                onClick={() => this.setPlace(prediction)}
                key={prediction.id}
              >
                {prediction.description}
              </div>
            ))}
          </SearchResults>
          {loadingPlaceInfo && <p>Buscando informações sobre o local...</p>}
          <ErrorContainer errors={errors} />
        </Field>
      </div>
    )
  }
}
