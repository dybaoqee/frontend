import {Component} from 'react'
import {Title, Input, Field} from '../../shared/styles'
import {FieldContainer, TextArea, SuggestionList} from './styles'
import Counter from 'components/shared/Common/Counter'
import Select from 'react-select'
export default class PropertyInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: ''
    }
    const {onChange, listing} = props
    onChange &&
      onChange(
        {target: {name: 'type', value: listing.type}},
        !listing.type ? 'Selecione o tipo do imóvel' : undefined
      )
  }

  onChangeSelect = ({value}) => {
    const {onChange} = this.props
    this.setState({type: value})
    onChange && onChange({target: {name: 'type', value}})
  }

  render() {
    const {onChange, listing} = this.props
    const {
      price,
      type: propertyType,
      floor,
      maintenance_fee,
      property_tax,
      area,
      rooms,
      bathrooms,
      garageSpots,
      description
    } = listing
    const {type} = this.state
    return (
      <div>
        <Title>Dados principais do imóvel</Title>
        <FieldContainer>
          <Field>
            <label htmlFor="price">Valor do imóvel</label>
            <Input
              type="text"
              name="price"
              defaultValue={price}
              placeholder="R$"
              onChange={onChange}
            />
          </Field>
          <Field>
            <label htmlFor="type">
              Tipo do imóvel <span>(Obrigatório)</span>
            </label>
            <Select
              className="teste"
              name="type"
              clearable={false}
              placeholder="Selecione o tipo"
              noResultsText="Nenhum resultado encontrado"
              options={[
                {value: 'Apartamento', label: 'Apartamento'},
                {value: 'Casa', label: 'Casa'},
                {value: 'Cobertura', label: 'Cobertura'}
              ]}
              value={propertyType}
              onChange={this.onChangeSelect}
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
            <Input
              type="text"
              defaultValue={maintenance_fee}
              name="maintenance_fee"
              placeholder="R$"
              onChange={onChange}
            />
          </Field>
          <Field>
            <label htmlFor="property_tax">IPTU</label>
            <Input
              type="text"
              name="property_tax"
              defaultValue={property_tax}
              placeholder="R$"
              onChange={onChange}
            />
          </Field>
          <Field>
            <label htmlFor="area">Área (em m²)</label>
            <Input
              defaultValue={area}
              type="text"
              name="area"
              placeholder="R$"
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
              defaultValue={garageSpots}
              name="garageSpots"
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
          </Field>
          <Field>
            <SuggestionList>
              <li>
                Fale sobre a vizinhança, pontos de referência e vias de acesso;
              </li>
              <li>
                Cite informações como: padarias, mercados, farmácias, etc;
              </li>
              <li>
                Fale sobre o estado do imóvel e suas características. Ex.:
                reformado, arejado, iluminado, etc.
              </li>
            </SuggestionList>
          </Field>
        </FieldContainer>
      </div>
    )
  }
}