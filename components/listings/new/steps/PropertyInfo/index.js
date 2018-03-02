import {Title, Input, Field} from '../../shared/styles'
import {FieldContainer, TextArea, SuggestionList} from './styles'
import Counter from 'components/shared/Common/Counter'
export default ({placeChosen, onChange}) => {
  const {address_components} = placeChosen
  return (
    <div>
      <Title>Dados principais do imóvel</Title>
      <FieldContainer>
        <Field>
          <label htmlFor="price">Valor do imóvel</label>
          <Input
            type="text"
            name="price"
            placeholder="R$"
            onChange={onChange}
          />
        </Field>
        <Field>
          <label htmlFor="type">
            Tipo do imóvel <span>(Obrigatório)</span>
          </label>
          <Input type="text" name="type" placeholder="Tipo" />
        </Field>
        <Field>
          <label htmlFor="floor">Andar</label>
          <Input
            type="text"
            name="floor"
            placeholder="Andar"
            onChange={onChange}
          />
        </Field>
        <Field>
          <label htmlFor="maintenance_fee">Condomínio</label>
          <Input
            type="text"
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
            placeholder="R$"
            onChange={onChange}
          />
        </Field>
        <Field>
          <label htmlFor="area">Área (em m²)</label>
          <Input type="text" name="area" placeholder="R$" onChange={onChange} />
        </Field>
        <Field>
          <label>Nᵒ quartos</label>
          <Counter onChange={onChange} name="rooms" />
        </Field>
        <Field>
          <label>Nᵒ banheiros</label>
          <Counter onChange={onChange} name="bathrooms" />
        </Field>
        <Field>
          <label>Nᵒ vagas garagem</label>
          <Counter onChange={onChange} name="garageSpots" />
        </Field>
        <Field>
          <label>Descrição</label>
          <TextArea
            onChange={onChange}
            name="description"
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
            <li>Cite informações como: padarias, mercados, farmácias, etc;</li>
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
