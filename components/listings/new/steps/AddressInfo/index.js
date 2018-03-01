import {Title, Input, Field} from '../../shared/styles'
import {FieldContainer} from './styles'

export default () => (
  <div>
    <Title>Onde fica o seu imóvel?</Title>
    <FieldContainer>
      <Field>
        <label htmlFor="address">Endereço</label>
        <Input
          type="text"
          name="address"
          // value={place.description || search}
          placeholder="Coloque seu endereço aqui"
          // onChange={this.onChange}
        />
      </Field>
      <Field>
        <label htmlFor="address">Número</label>
        <Input
          type="text"
          name="number"
          // value={place.description || search}
          placeholder="Coloque seu número aqui"
          // onChange={this.onChange}
        />
      </Field>
      <Field>
        <label htmlFor="address">Complemento</label>
        <Input
          type="text"
          name="complement"
          // value={place.description || search}
          placeholder="Coloque seu complement aqui"
          // onChange={this.onChange}
        />
      </Field>
      <Field>
        <label htmlFor="address">CEP</label>
        <Input
          type="text"
          name="cep"
          // value={place.description || search}
          placeholder="Coloque seu cep aqui"
          // onChange={this.onChange}
        />
      </Field>
      <Field>
        <label htmlFor="address">Cidade</label>
        <Input
          type="text"
          name="address"
          // value={place.description || search}
          placeholder="Coloque sua cidade aqui"
          // onChange={this.onChange}
        />
      </Field>
      <Field>
        <label htmlFor="address">Estado</label>
        <Input
          type="text"
          name="address"
          // value={place.description || search}
          placeholder="Coloque seu estado aqui"
          // onChange={this.onChange}
        />
      </Field>
    </FieldContainer>
  </div>
)
