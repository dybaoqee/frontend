import {Component} from 'react'
import {Field} from 'components/listings/shared/styles'
import Form from 'components/shared/Common/Form'
import {FieldContainer} from './styles'

export default class PropertyInfo extends Component {
  render() {
    const {onChange} = this.props
    return (
      <Form full>
        <FieldContainer>
          <Field aria-label="name">
            <label htmlFor="name">Nome completo</label>
            <input
              type="text"
              name="name"
              onChange={onChange}
              autoComplete="off"
            />
          </Field>
          <Field aria-label="email">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              onChange={onChange}
              autoComplete="off"
            />
          </Field>
        </FieldContainer>
      </Form>
    )
  }
}
