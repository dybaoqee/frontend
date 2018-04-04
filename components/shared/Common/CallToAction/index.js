import Link from 'next/link'
import Container from './styles'

export default (props) => (
  <Container>
    <Link {...props}>
      <a>{props.call} →</a>
    </Link>
  </Container>
)
