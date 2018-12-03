import {Component, Fragment} from 'react'
import {Title, InputWithMask, Field} from 'components/listings/shared/styles'
import Form from 'components/shared/Common/Form'
import {FieldContainer, TextArea, SuggestionList} from './styles'
import Counter from 'components/shared/Common/Counter'
import Select from 'react-select'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import PhoneField from 'components/listings/shared/PhoneField'
import {GET_USER_INFO} from 'graphql/user/queries'

const priceMask = createNumberMask({
  prefix: '',
  thousandsSeparatorSymbol: '.',
  integerLimit: 12
})

const minPrice = 250000
const maxPrice = 100000000
const currencyStyle = {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
}

export default class PropertyInfo extends Component {
  constructor(props) {
    super(props)
    const {onChange, listing, isAdmin} = props

    onChange(
      {target: {name: 'type', value: listing.type}},
      !listing.type ? 'Selecione o tipo do imóvel' : undefined
    )

    this.checkUserPhone()

    isAdmin &&
      setTimeout(
        () =>
          onChange(
            {target: {name: 'price', value: listing.price || 0}},
            this.getPriceErrorMessage(listing.price || 0)
          ),
        100
      )

    this.state = {
      userPhone: ''
    }
  }

  checkUserPhone = async () => {
    const {apolloClient, user} = this.props

    if (user.admin) return
    const {data} = await apolloClient.query({
      query: GET_USER_INFO,
      variables: {
        id: user.id
      }
    })

    this.onChangePhone({target: {name: 'phone', value: data.userProfile.phone}})

    this.setState({userPhone: data ? data.userProfile.phone : ''})
  }

  onChangeSelect = (...args) => {
    const {onChange} = this.props
    const [type, selection] = args
    onChange && onChange({target: {name: type, value: selection.value}})
  }

  getPriceErrorMessage = (price) => {
    const value = parseInt(price.toString().replace(/\D/g, ''))
    const errorMessage =
      value < minPrice
        ? `Valor mínimo:
        ${minPrice.toLocaleString('pt-BR', currencyStyle)}`
        : value > maxPrice
          ? `Valor máximo:
          ${maxPrice.toLocaleString('pt-BR', currencyStyle)}`
          : undefined
    return errorMessage
  }

  onChangePrice = (e) => {
    const {onChange} = this.props

    const errorMessage = this.getPriceErrorMessage(e.target.value || 0)
    onChange && onChange(e, errorMessage)
  }

  onChangePhone = (e) => {
    const {onChange} = this.props
    const errorMessage = e.target.value ? undefined : 'Digite seu telefone'
    onChange && onChange(e, errorMessage)
  }

  showAdminFields = () => {
    const {onChange, listing} = this.props
    const {price, matterport_code, score} = listing
    return (
      <Fragment>
        <Field aria-label="price">
          <label htmlFor="price">Preço</label>
          <InputWithMask
            value={price && price.toString().length > 0 ? price : ''}
            name="price"
            type="text"
            mask={priceMask}
            guide={false}
            onChange={this.onChangePrice}
          />
        </Field>
        <Field aria-label="matterport_code">
          <label htmlFor="floor">Código do Matterport</label>
          <input
            type="text"
            name="matterport_code"
            defaultValue={matterport_code}
            placeholder=""
            onChange={onChange}
          />
        </Field>
        <Field aria-label="score">
          <label htmlFor="score">Farol</label>
          <Select
            clearable={false}
            className="score"
            placeholder="Selecione o Farol"
            noResultsText="Nenhum resultado encontrado"
            options={[
              {value: 4, label: 'Verde'},
              {value: 3, label: 'Amarelo'},
              {value: 2, label: 'Vermelho'},
              {value: 1, label: 'Preto'}
            ]}
            value={score || ''}
            onChange={this.onChangeSelect.bind(null, 'score')}
          />
        </Field>
      </Fragment>
    )
  }

  render() {
    const {onChange, listing, isAdmin, errors, user, apolloClient} = this.props
    const {userPhone} = this.state
    const {
      type: propertyType,
      floor,
      maintenance_fee,
      property_tax,
      area,
      rooms,
      bathrooms,
      garage_spots,
      description
    } = listing

    return (
      <Form full errors={errors}>
        <Title>Dados principais do imóvel</Title>

        <FieldContainer>
          {!isAdmin && (
            <PhoneField
              user={user}
              phone={userPhone}
              onChange={this.onChangePhone}
              apolloClient={apolloClient}
            />
          )}
          <Field aria-label="type">
            <label htmlFor="type">
              Tipo do imóvel <span>(Obrigatório)</span>
            </label>
            <Select
              clearable={false}
              className="type"
              placeholder="Selecione o tipo"
              noResultsText="Nenhum resultado encontrado"
              options={[
                {value: 'Apartamento', label: 'Apartamento'},
                {value: 'Casa', label: 'Casa'},
                {value: 'Cobertura', label: 'Cobertura'}
              ]}
              value={propertyType || ''}
              onChange={this.onChangeSelect.bind(null, 'type')}
            />
          </Field>
          <Field aria-label="floor">
            <label htmlFor="floor">Andar</label>
            <input
              type="text"
              name="floor"
              defaultValue={floor}
              placeholder="Andar"
              onChange={onChange}
            />
          </Field>
          <Field aria-label="maintenance_fee">
            <label htmlFor="maintenance_fee">Condomínio (R$)</label>
            <InputWithMask
              type="text"
              value={maintenance_fee}
              name="maintenance_fee"
              mask={priceMask}
              guide={false}
              onChange={onChange}
            />
          </Field>
          <Field aria-label="property_tax">
            <label htmlFor="property_tax">IPTU (R$)</label>
            <InputWithMask
              type="text"
              value={property_tax}
              name="property_tax"
              mask={priceMask}
              guide={false}
              onChange={onChange}
            />
          </Field>
          <Field aria-label="area">
            <label htmlFor="area">Área (em m²)</label>
            <InputWithMask
              value={area}
              type="text"
              name="area"
              placeholder="Área"
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
              guide={false}
              onChange={onChange}
            />
          </Field>
          <Field aria-label="rooms">
            <label>Nᵒ quartos</label>
            <Counter onChange={onChange} defaultValue={rooms} name="rooms" />
          </Field>
          <Field aria-label="bathrooms">
            <label>Nᵒ banheiros</label>
            <Counter
              onChange={onChange}
              defaultValue={bathrooms}
              name="bathrooms"
            />
          </Field>
          <Field aria-label="garage_spots">
            <label>Nᵒ vagas garagem</label>
            <Counter
              onChange={onChange}
              defaultValue={garage_spots}
              name="garage_spots"
            />
          </Field>
          <Field aria-label="description">
            <label>Descrição</label>
            <TextArea
              lang="pt-BR"
              spellcheck
              onChange={onChange}
              name="description"
              defaultValue={description}
              placeholder="Ex.: Apartamento bem localizado,
             próximo ao Parque Boulevard e a 5 minutos à pé da estação de metrô Rubi.
            Rua arborizada, com padaria e farmácia a 2 quadras do edifício.
            Imóvel arejado e com face norte..."
            />
            {!isAdmin && (
              <SuggestionList>
                <li>
                  Fale sobre a vizinhança, pontos de referência e vias de
                  acesso;
                </li>
                <li>
                  Cite informações como: padarias, mercados, farmácias, etc;
                </li>
                <li>
                  Fale sobre o estado do imóvel e suas características. Ex.:
                  reformado, arejado, iluminado, etc.
                </li>
              </SuggestionList>
            )}
          </Field>

          {isAdmin && this.showAdminFields()}
        </FieldContainer>
      </Form>
    )
  }
}
