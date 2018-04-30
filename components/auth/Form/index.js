import Container from './styles'

export default ({handleSubmit, children}) => (
  <Container>
    <form onSubmit={handleSubmit}>{children}</form>
  </Container>
)
