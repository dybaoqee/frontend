import ErrorContainer, {
  Error
} from 'components/listings/new/shared/ErrorContainer/styles'

function getErrors(errors) {
  for (const key of Object.keys(errors)) {
    return <Error key={key}>{errors[key]}</Error>
  }
}
export default ({errors}) => (
  <ErrorContainer>{getErrors(errors)}</ErrorContainer>
)
