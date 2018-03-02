import Error from 'components/listings/new/shared/ErrorContainer/styles'
export default ({errors}) =>
  errors.map((error) => <Error key={error.trim()}>{error}</Error>)
