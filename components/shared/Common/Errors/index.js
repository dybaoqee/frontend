import ErrorContainer, {Error} from './styles'

function getErrors(errors) {
  return errors.map((error) => <Error key={error}>{error}</Error>)
}
export default ({errors}) =>
  errors.length > 0 ? <ErrorContainer>{getErrors(errors)}</ErrorContainer> : ''
