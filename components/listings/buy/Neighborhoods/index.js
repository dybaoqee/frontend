import {Component} from 'react'
import Text from '@emcasa/ui-dom/components/Text'
import {
  Container,
  Content,
  Header,
  Cities,
  City,
  CityTitle,
  NeighborhoodContainer,
  NeighborhoodItems,
  Neighborhood,
  Soon,
  Spacer
} from './styles'

const CITIES = [
  {title: 'Bairros no Rio de Janeiro', slug: 'rj'},
  {title: 'Bairros em São Paulo', slug: 'sp'}
]

const NEIGHBORHOODS = [
  {name: 'Copacabana', thumb: 'copacabana', city: 'rj'},
  {name: 'Ipanema', thumb: 'ipanema', city: 'rj'},
  {name: 'Leblon', thumb: 'leblon', city: 'rj'},
  {name: 'Perdizes', thumb: 'perdizes', city: 'sp'},
  {name: 'Pinheiros', thumb: 'pinheiros', soon: true, city: 'sp'},
  {name: 'Pompéia', thumb: 'pompeia', soon: true, city: 'sp'}
]

const NEIGHBORHOODS_BY_CITIES = NEIGHBORHOODS.reduce((cities, neighborhood) => {
  if (!cities[neighborhood.city]) {
    cities[neighborhood.city] = []
  }
  cities[neighborhood.city].push(neighborhood)
  return cities
}, {})

export default class Neighborhoods extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Header>
            <Text fontSize="xlarge" fontWeight="bold" textAlign="center" className="title">
              Imóveis à venda no Rio de Janeiro e São Paulo
            </Text>
            <Text color="grey" textAlign="center">
              Escolha a localidade e confira os imóveis disponíveis
            </Text>
          </Header>
          <Cities>
            {CITIES.map(({title, slug}) => (
              <City>
                <CityTitle>
                  <Text fontWeight="bold">
                    {title}
                  </Text>
                </CityTitle>

                <NeighborhoodContainer>
                  <NeighborhoodItems>
                    {NEIGHBORHOODS_BY_CITIES[slug].map(({name, ...props}) => (
                      <Neighborhood {...props}>
                        <Text>{name}</Text>
                        {props.soon && <Soon />}
                      </Neighborhood>
                    ))}
                    <Spacer />
                  </NeighborhoodItems>
                </NeighborhoodContainer>
              </City>
            ))}
          </Cities>
        </Content>
      </Container>
    )
  }
}
