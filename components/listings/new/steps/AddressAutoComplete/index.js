import React from 'react'
import {Title, Input, Field} from 'components/listings/shared/styles'
import {SearchResults, FieldContainer} from './styles'
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

      const {predictions} = json.json

      this.setState({
        predictions,
        errors:
          predictions.length === 0
            ? [
                ...this.state.errors,
                'Não encontramos o endereço. Tente novamente com outros termos.'
              ]
            : []
      })
    } catch (e) {
      this.setState({
        errors: [...this.state.errors, 'Ocorreu um erro ao buscar o endereço.']
      })
    }
  }

  positionCursor = () => {
    const searchWord = 'número'
    const input = this.searchInput
    const startPosition = this.searchInput.value.indexOf(searchWord)

    input.setSelectionRange(startPosition, this.searchInput.value.length)
    input.focus()
  }

  async setPlace(place) {
    const {structured_formatting} = place
    const placeAddress = structured_formatting.main_text.split(',')
    if (!placeAddress[1]) {
      this.setState(
        {
          errors: [...this.state.errors, 'Digite o número da localização'],
          place: {},
          predictions: [],
          search: `${placeAddress[0]}, número`
        },
        this.positionCursor
      )
      return
    }
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

  getSearchResults = () => {
    const {predictions, search} = this.state
    const words = search
      .replace(/,/g, ' ')
      .split(' ')
      .filter((word) => word && word.length > 0)
    const regex = new RegExp('(' + words.join('|') + ')', 'ig')

    return predictions.map((prediction) => {
      const formattedOutput = prediction.description.replace(
        regex,
        '<span>$1</span>'
      )

      return (
        <div onClick={() => this.setPlace(prediction)} key={prediction.id}>
          <p dangerouslySetInnerHTML={{__html: formattedOutput}} />
        </div>
      )
    })
  }

  onChange = (e) => {
    const {value} = e.target
    const {resetListing} = this.props
    resetListing()
    this.setState({search: value, place: {}, errors: []})
    clearTimeout(this.timer)

    this.timer = setTimeout(this.searchPlaces.bind(null, value), 300)
  }
  render() {
    const {place, search, loadingPlaceInfo, errors} = this.state
    const {listing, onChange} = this.props
    const address = `${listing.street}, ${listing.street_number} - ${
      listing.neighborhood
    }, ${listing.city} - ${listing.state}, Brasil`

    return (
      <div>
        <Title>Onde fica o seu imóvel?</Title>
        <ErrorContainer errors={errors} />
        <FieldContainer>
          <Field>
            <label htmlFor="street">Endereço com número</label>
            <Input
              type="text"
              name="street"
              innerRef={(input) => (this.searchInput = input)}
              value={place.description || (listing.street ? address : search)}
              placeholder="Coloque seu endereço aqui"
              onChange={this.onChange}
              autoComplete="off"
            />
            <SearchResults>{this.getSearchResults()}</SearchResults>
          </Field>
          <Field>
            <label htmlFor="address">Complemento</label>
            <Input
              type="text"
              name="complement"
              defaultValue={listing.complement}
              placeholder=""
              onChange={onChange}
            />
          </Field>
        </FieldContainer>

        {loadingPlaceInfo && <p>Buscando informações sobre o local...</p>}
      </div>
    )
  }
}
