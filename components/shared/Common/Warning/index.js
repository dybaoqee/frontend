import Container from './styles'
export default (props) => (
  <Container {...props}>
    <span>{props.message || 'Aviso'}</span>
  </Container>
)
