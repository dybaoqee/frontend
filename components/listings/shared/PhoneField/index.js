import {Component} from 'react'
import debounce from 'lodash/debounce'
import {Field} from 'components/listings/shared/styles'
import {EDIT_PROFILE} from 'graphql/user/mutations'
export default class PhoneField extends Component {
  delayedCallback = debounce(async (e) => {
    const {user, onChange, apolloClient} = this.props

    const {data} = await apolloClient.mutate({
      mutation: EDIT_PROFILE,
      variables: {
        id: user.id,
        phone: e.target.value
      }
    })

    onChange({target: {name: 'phone', value: data.editUserProfile.phone}})
  }, 500)

  updatePhone = async (e) => {
    e.persist()

    this.delayedCallback(e)
  }

  render() {
    const {phone} = this.props
    return (
      <Field key={phone} aria-label="phone">
        <label htmlFor="phone">
          Telefone para contato <span>(Obrigatório)</span>
        </label>
        <input
          type="tel"
          name="phone"
          defaultValue={phone}
          placeholder="Telefone"
          onChange={this.updatePhone}
        />
      </Field>
    )
  }
}
