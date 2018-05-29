import Container from './styles'

export default ({user}) => (
  <Container admin={user.role == 'admin'}>
    {user.role == 'user' ? (
      user.name
        .split(' ')
        .map((name) => name.charAt(0).toUpperCase())
        .join('')
    ) : (
      <img src="/static/img/em-casa-symbol-no-bg.png" />
    )}
  </Container>
)
