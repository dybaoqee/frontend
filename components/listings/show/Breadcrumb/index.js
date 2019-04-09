import Link from 'next/link'
import {
  Wrapper,
  Container,
  Path,
  BreadcrumbText
} from './styles'
import Text from '@emcasa/ui-dom/components/Text'


export default ({paths}) => (
  <Wrapper>  
    <Container>
      {paths.map(({name, href, as}) => (
        <Path key={name}>
          {href ? (
            <Link href={href} as={as}>
              <a>
                <Text fontSize="small" color="inherit" fontWeight="normal" inline link="true">{name}</Text>
              </a>
            </Link>
          ) : (
            <Text fontSize="small" color="inherit" fontWeight="normal" inline>{name}</Text>
          )}
        </Path>
      ))}
    </Container>
  </Wrapper>
)
