import ErrorContainer, {
  Error
} from 'components/listings/new/shared/ErrorContainer/styles'

import values from 'lodash/values'

function getErrors(errors) {
  return values(errors).map((value) => <Error key={value}>{value}</Error>)
}
export default ({errors}) => (
  <ErrorContainer>{getErrors(errors)}</ErrorContainer>
)
