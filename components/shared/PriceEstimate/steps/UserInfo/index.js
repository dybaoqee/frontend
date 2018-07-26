import {Component} from 'react'
import {InputWithMask, Field} from 'components/listings/shared/styles'
import Form from 'components/shared/Common/Form'
import {FieldContainer} from './styles'
import emailMask from 'text-mask-addons/dist/emailMask'

export default class PropertyInfo extends Component {
  render() {
    const {onChange} = this.props
    return (
      <Form onSubmit={(e) => e.preventDefault()} full>
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
            <InputWithMask
              type="text"
              name="email"
              autoComplete="off"
              mask={emailMask}
              guide={true}
              onChange={onChange}
            />
          </Field>
        </FieldContainer>
      </Form>
    )
  }
}
