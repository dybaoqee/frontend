import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Query} from 'react-apollo'
import { filterComponent } from 'services/google-maps-api'
import { MoonLoader } from 'react-spinners';
import Fuse from 'fuse.js'
import {GET_DISTRICTS} from 'graphql/listings/queries'

import theme from '@emcasa/ui'
import Input from '@emcasa/ui-dom/components/Input'
import Col from '@emcasa/ui-dom/components/Col'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import {
  SearchResultContainer,
  SearchResultItem,
  InputContainer,
  BackIcon
} from './styles'

export default class NeighborhoodAutoComplete extends Component {
  constructor(props) {
    super(props)
    this.timer = null
    this.searchInput = React.createRef()
    this.inputContainer = React.createRef()
    this.predictionsIds = []
    this.secondaryText = undefined
  }

  state = {
    dirty: false,
    predictions: [],
    predictionSelected: 0,
    showPredictions: false,
    place: {},
    search: '',
    errors: [],
    loadingPlaceInfo: false
  }

  static propTypes = {
    searchResultsMargin: PropTypes.number,
    defaultValue: PropTypes.string,
    onSelectAddress: PropTypes.func.isRequired,
    onClearInput: PropTypes.func,
    onBackPressed: PropTypes.func
  }

  static defaultProps = {
    defaultValue: null
  }

  componentDidMount() {
    if (this.searchInput.current) {
      this.searchInput.current.focus()
    }
  }

  searchPlaces = async (input) => {
    this.setState({
      showPredictions: Boolean(input),
      input: input,
      predictionSelected: 0,
    })

  }

  getSearchResults = () => {
    return (
      <Query query={GET_DISTRICTS}>
        {({data: {districts}, loading}) => {
          if (loading) {
            return null
          }

          /*const {predictions, predictionSelected, search} = this.state
          const words = search
            .replace(/,/g, ' ')
            .split(' ')
            .filter((word) => word && word.length > 0)
          const regex = new RegExp('(' + words.join('|') + ')', 'ig')
          this.predictionsIds = []*/
          const itemsToSearch = new Fuse(districts, {threshold: 0.1 , keys: ['name']})
          const results = itemsToSearch.search(this.state.input)
          return results.filter(d => d.name).map((disctrict, index) => {
            return (
              <SearchResultItem
                key={index}
              >
                <Text>{disctrict.name}</Text>
              </SearchResultItem>
            )
          })
        }}
      </Query>
    )

  }

  onKeyPress = (e) => {
    const {keyCode} = e
    const {
      predictions,
      predictionSelected,
      showPredictions,
      search
    } = this.state
    let newPredictionSelected = predictionSelected
    if (predictions.length > 0) {
      switch (keyCode) {
        case 9:
          search.indexOf('número') === -1
            ? this.setPlace(predictions[0])
            : this.setState({showPredictions: !showPredictions})
          break
        case 38:
          newPredictionSelected =
            predictionSelected > 0
              ? newPredictionSelected - 1
              : predictions.length - 1
          break
        case 40:
          newPredictionSelected =
            predictionSelected >= predictions.length - 1
              ? 0
              : newPredictionSelected + 1
          break
        case 13:
          const prediction = predictions.filter(
            (prediction) =>
              prediction.description ===
              this.predictionsIds[newPredictionSelected]
          )[0]
          this.setPlace(prediction)
          e.preventDefault()
          break
      }
    }

    this.setState({predictionSelected: newPredictionSelected})
  }

  onChange = (e) => {
    const {value} = e.target
    this.setState({
      dirty: true,
      search: value,
      place: {},
      errors: []
    })
    clearTimeout(this.timer)
    this.timer = setTimeout(this.searchPlaces.bind(null, value), 300)

    const { onClearInput } = this.props
    if (onClearInput) {
      if (!value || value === '') {
        onClearInput()
      }
    }
  }

  render() {
    const {
      dirty,
      place,
      search,
      loadingPlaceInfo,
      showPredictions,
      errors
    } = this.state
    const value = place.description || search
    const { onBackPressed, defaultValue } = this.props

    let suggestionsWidth = null
    if (this.inputContainer && this.inputContainer.current) {
      suggestionsWidth = this.inputContainer.current.offsetWidth
    }
    return (
      <div ref={this.inputContainer}>
        <InputContainer>
          {onBackPressed &&
            <BackIcon name="arrow-left" color="dark" onClick={onBackPressed} />
          }
          <Col width={1}>
            <Input
              style={{border: 0}}
              hideLabelView
              hideErrorView
              onKeyDown={this.onKeyPress}
              type="text"
              name="street"
              ref={this.searchInput}
              value={dirty ? value : defaultValue}
              placeholder="Bairro, Cidade ou Código"
              onChange={this.onChange}
              autoComplete="off"
            />
          </Col>
          {loadingPlaceInfo &&
            <View mr={2}>
              <MoonLoader
                size={24}
                color={theme.colors.pink}
                style={{marginRight: 14}}
                loading={loadingPlaceInfo}
              />
            </View>
          }
        </InputContainer>
        {errors.length > 0 && <Text inline color="red" fontSize="small">{errors[0]}</Text>}
        {showPredictions &&
          <SearchResultContainer width={suggestionsWidth}>
            <Col width={[1]}>
              {this.getSearchResults()}
            </Col>
          </SearchResultContainer>
        }
      </div>
    )
  }
}
