import React from 'react'
import {Title, Input, Field} from '../../shared/styles'
import {SearchResults} from './styles'

export default class AddressAutoComplete extends React.Component {
  constructor(props) {
    super(props)
    this.timer = null
    this.state = {
      predictions: [],
      place: {},
      search: ''
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

  setPlace(place) {
    this.setState({place, predictions: []})
  }

  onChange = (e) => {
    const {value} = e.target
    this.setState({search: value, place: {}})
    clearTimeout(this.timer)

    this.timer = setTimeout(this.searchPlaces.bind(null, value), 500)
  }
  render() {
    const {predictions, place, search} = this.state
    return (
      <div>
        <Title>Onde fica o seu imóvel?</Title>
        <Field>
          <label htmlFor="street">Rua</label>
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
        </Field>
      </div>
    )
  }
}
