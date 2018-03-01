import {Title, Input, Field} from '../../shared/styles'
import {FieldContainer} from './styles'
import Counter from 'components/shared/Common/Counter'
export default ({placeChosen}) => {
  const {address_components} = placeChosen
  return (
    <div>
      <Title>Dados principais do imóvel</Title>
      <FieldContainer>
        <Field>
          <label htmlFor="price">Valor do imóvel</label>
          <Input type="text" name="price" placeholder="R$" />
        </Field>
        <Field>
          <label htmlFor="type">Tipo do imóvel</label>
          <Input type="text" name="type" placeholder="Tipo" />
        </Field>
        <Field>
          <label htmlFor="floor">Andar</label>
          <Input type="text" name="floor" placeholder="Andar" />
        </Field>
        <Field>
          <label htmlFor="maintenance_fee">Condomínio</label>
          <Input type="text" name="maintenance_fee" placeholder="R$" />
        </Field>
        <Field>
          <label htmlFor="property_tax">IPTU</label>
          <Input type="text" name="property_tax" placeholder="R$" />
        </Field>
        <Field>
          <label htmlFor="area">Área (em m²)</label>
          <Input type="text" name="area" placeholder="R$" />
        </Field>
        <Field>
          <label>Nᵒ quartos</label>
          <Counter />
        </Field>
        <Field>
          <label>Nᵒ banheiros</label>
          <Counter />
        </Field>
        <Field>
          <label>Nᵒ vagas garagem</label>
          <Counter />
        </Field>
      </FieldContainer>
    </div>
  )
}
