import Container from './styles'
export default ({message}) => (
  <Container>
    <span>{message || 'Aviso'}</span>
  </Container>
)
