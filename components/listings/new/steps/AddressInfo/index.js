import {Title, Input, InputWithMask, Field} from '../../shared/styles'
import {FieldContainer} from './styles'
const postalCodeMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]
export default ({onChange, listing}) => {
  const {street, street_number, complement, postal_code, city, state} = listing

  return (
    <div>
      <Title>Onde fica o seu imóvel?</Title>
      <FieldContainer>
        <Field>
          <label htmlFor="address">Endereço</label>
          <Input
            type="text"
            name="street"
            defaultValue={street}
            placeholder="Coloque seu endereço aqui"
            onChange={onChange}
            disabled
          />
        </Field>
        <Field>
          <label htmlFor="address">Número</label>
          <Input
            type="text"
            name="street_number"
            defaultValue={street_number}
            placeholder="Coloque seu número aqui"
            onChange={onChange}
            disabled
          />
        </Field>
        <Field>
          <label htmlFor="address">Complemento</label>
          <Input
            type="text"
            name="complement"
            defaultValue={complement}
            placeholder="Coloque o complemento aqui"
            onChange={onChange}
          />
        </Field>
        <Field>
          <label htmlFor="address">CEP</label>
          <InputWithMask
            value={postal_code}
            name="postal_code"
            mask={postalCodeMask}
            placeholder="Coloque o CEP aqui"
            guide={false}
            onChange={onChange}
            disabled
          />
        </Field>
        <Field>
          <label htmlFor="address">Cidade</label>
          <Input
            type="text"
            name="city"
            defaultValue={city}
            placeholder="Coloque sua cidade aqui"
            onChange={onChange}
            disabled
          />
        </Field>
        <Field>
          <label htmlFor="address">Estado</label>
          <Input
            type="text"
            name="state"
            defaultValue={state}
            placeholder="Coloque seu estado aqui"
            onChange={onChange}
            disabled
          />
        </Field>
      </FieldContainer>
    </div>
  )
}
