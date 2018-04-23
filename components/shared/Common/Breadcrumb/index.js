import Link from 'next/link'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faHome from '@fortawesome/fontawesome-pro-light/faHome'
import Container, {Path} from './styles'

export default ({paths}) => (
  <Container>
    <Path>
      <Link href="/">
        <FontAwesomeIcon icon={faHome} />
      </Link>
    </Path>
    {paths.map(({name, href, as}) => (
      <Path key={as}>
        {href ? (
          <Link href={href} as={as}>
            {name}
          </Link>
        ) : (
          <span>{name}</span>
        )}
      </Path>
    ))}
  </Container>
)
