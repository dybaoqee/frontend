import ErrorContainer, {
  Error
} from 'components/listings/new/shared/ErrorContainer/styles'

import _ from 'lodash'

function getErrors(errors) {
  return _.values(errors).map((value) => <Error key={value}>{value}</Error>)
}
export default ({errors}) => (
  <ErrorContainer>{getErrors(errors)}</ErrorContainer>
)
