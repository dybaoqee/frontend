import {Component, Fragment} from 'react'
import {Title, Input, InputWithMask, Field} from '../../shared/styles'
import {FieldContainer, TextArea, SuggestionList} from './styles'
import Counter from 'components/shared/Common/Counter'
import Select from 'react-select'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

const priceMask = createNumberMask({
  prefix: '',
  thousandsSeparatorSymbol: '.',
  integerLimit: 12
})

export default class PropertyInfo extends Component {
  constructor(props) {
    super(props)
    const {onChange, listing} = props
    onChange &&
      onChange(
        {target: {name: 'type', value: listing.type}},
        !listing.type ? 'Selecione o tipo do imóvel' : undefined
      )
  }

  onChangeSelect = (...args) => {
    const {onChange} = this.props
    const [type, selection] = args
    onChange && onChange({target: {name: type, value: selection.value}})
  }

  showAdminFields = () => {
    const {onChange, listing} = this.props
    const {price, matterport_code, score} = listing
    return (
      <Fragment>
        <Field>
          <label htmlFor="price">Valor do imóvel</label>
          <InputWithMask
            value={price && price.toString().length > 0 ? price : ''}
            name="price"
            mask={priceMask}
            guide={false}
            onChange={onChange}
          />
        </Field>
        <Field>
          <label htmlFor="floor">Código do Matterport</label>
          <Input
            type="text"
            name="matterport_code"
            defaultValue={matterport_code}
            placeholder=""
            onChange={onChange}
          />
        </Field>
        <Field>
          <label htmlFor="score">Farol</label>
          <Select
            name="score"
            clearable={false}
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
    const {onChange, listing, isAdmin} = this.props
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
      <div>
        <Title>Dados principais do imóvel</Title>
        <FieldContainer>
          <Field>
            <label htmlFor="type">
              Tipo do imóvel <span>(Obrigatório)</span>
            </label>
            <Select
              name="type"
              clearable={false}
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
          <Field>
            <label htmlFor="floor">Andar</label>
            <Input
              type="text"
              name="floor"
              defaultValue={floor}
              placeholder="Andar"
              onChange={onChange}
            />
          </Field>
          <Field>
            <label htmlFor="maintenance_fee">Condomínio</label>
            <InputWithMask
              value={maintenance_fee}
              name="maintenance_fee"
              mask={priceMask}
              guide={false}
              onChange={onChange}
            />
          </Field>
          <Field>
            <label htmlFor="property_tax">IPTU</label>
            <InputWithMask
              value={property_tax}
              name="property_tax"
              mask={priceMask}
              guide={false}
              onChange={onChange}
            />
          </Field>
          <Field>
            <label htmlFor="area">Área (em m²)</label>
            <InputWithMask
              value={area}
              name="area"
              placeholder="Área"
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
              guide={false}
              onChange={onChange}
            />
          </Field>
          <Field>
            <label>Nᵒ quartos</label>
            <Counter onChange={onChange} defaultValue={rooms} name="rooms" />
          </Field>
          <Field>
            <label>Nᵒ banheiros</label>
            <Counter
              onChange={onChange}
              defaultValue={bathrooms}
              name="bathrooms"
            />
          </Field>
          <Field>
            <label>Nᵒ vagas garagem</label>
            <Counter
              onChange={onChange}
              defaultValue={garage_spots}
              name="garage_spots"
            />
          </Field>
          <Field>
            <label>Descrição</label>
            <TextArea
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
      </div>
    )
  }
}
