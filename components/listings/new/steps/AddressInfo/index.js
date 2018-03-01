import {Title, Input, Field} from '../../shared/styles'
import {FieldContainer} from './styles'

function filterPropertyComponent(array, property) {
  return (
    array.filter((component) => component.types.includes(property))[0] || {}
  )
}

export default ({placeChosen}) => {
  const {address_components} = placeChosen

  const street = filterPropertyComponent(address_components, 'route')
  const streetNumber = filterPropertyComponent(
    address_components,
    'street_number'
  )
  const state = filterPropertyComponent(
    address_components,
    'administrative_area_level_1'
  )

  const city = filterPropertyComponent(
    address_components,
    'administrative_area_level_2'
  )

  const postal_code = filterPropertyComponent(address_components, 'postal_code')
  return (
    <div>
      <Title>Onde fica o seu imóvel?</Title>
      <FieldContainer>
        <Field>
          <label htmlFor="address">Endereço</label>
          <Input
            type="text"
            name="address"
            defaultValue={street.long_name}
            placeholder="Coloque seu endereço aqui"
          />
        </Field>
        <Field>
          <label htmlFor="address">Número</label>
          <Input
            type="text"
            name="number"
            defaultValue={streetNumber.long_name}
            placeholder="Coloque seu número aqui"
          />
        </Field>
        <Field>
          <label htmlFor="address">Complemento</label>
          <Input
            type="text"
            name="complement"
            placeholder="Coloque o complemento aqui"
          />
        </Field>
        <Field>
          <label htmlFor="address">CEP</label>
          <Input
            type="text"
            name="cep"
            defaultValue={postal_code.long_name}
            placeholder="Coloque seu cep aqui"
          />
        </Field>
        <Field>
          <label htmlFor="address">Cidade</label>
          <Input
            type="text"
            name="address"
            defaultValue={city.long_name}
            placeholder="Coloque sua cidade aqui"
            disabled
          />
        </Field>
        <Field>
          <label htmlFor="address">Estado</label>
          <Input
            type="text"
            name="address"
            defaultValue={state.short_name}
            placeholder="Coloque seu estado aqui"
            disabled
          />
        </Field>
      </FieldContainer>
    </div>
  )
}
