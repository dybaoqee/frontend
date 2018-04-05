import Link from 'next/link'
import Container from './styles'

export default (props) => (
  <Container>
    <Link href={props.href} as={props.as}>
      <a>{props.call} →</a>
    </Link>
  </Container>
)
