import ErrorContainer, {
  Error
} from 'components/listings/new/shared/ErrorContainer/styles'
export default ({errors}) => (
  <ErrorContainer>
    {errors.map((error) => <Error key={error.trim()}>{error}</Error>)}
  </ErrorContainer>
)
