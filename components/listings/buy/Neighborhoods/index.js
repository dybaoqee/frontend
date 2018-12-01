import {Component} from 'react'
import Link from 'next/link'
import Text from '@emcasa/ui-dom/components/Text'
import {Query} from 'react-apollo'
import slug from 'slug'
import {GET_DISTRICTS} from 'graphql/listings/queries'
import {
  Container,
  Content,
  Header,
  Cities,
  City,
  CityTitle,
  CityInfo,
  NeighborhoodContainer,
  NeighborhoodsLinks,
  NeighborhoodItems,
  Neighborhood,
  Soon,
  Spacer
} from './styles'

const RJ_SLUG = 'rio-de-janeiro'
const SP_SLUG = 'sao-paulo'

const CITIES = [
  {title: 'Bairros no Rio de Janeiro', slug: RJ_SLUG, stateSlug: 'rj'},
  {title: 'Bairros em São Paulo', slug: SP_SLUG, stateSlug: 'sp'}
]

const NEIGHBORHOODS = [
  {name: 'Copacabana', thumb: 'copacabana', city: RJ_SLUG},
  {name: 'Ipanema', thumb: 'ipanema', city: RJ_SLUG},
  {name: 'Leblon', thumb: 'leblon', city: RJ_SLUG},
  {name: 'Perdizes', thumb: 'perdizes', city: SP_SLUG},
  {name: 'Pinheiros', thumb: 'pinheiros', soon: true, city: SP_SLUG},
  {name: 'Pompéia', thumb: 'pompeia', soon: true, city: SP_SLUG}
]

const NEIGHBORHOODS_BY_CITIES = NEIGHBORHOODS.reduce((cities, neighborhood) => {
  if (!cities[neighborhood.city]) {
    cities[neighborhood.city] = []
  }
  cities[neighborhood.city].push(neighborhood)
  return cities
}, {})

const getCityNeighborhoodLinks = (citySlug) => (
  <NeighborhoodsLinks>
    <Query query={GET_DISTRICTS}>
      {({data: {districts}, loading}) =>
        loading ? (
          <div />
        ) : (
          districts.filter(d => d.citySlug === citySlug).map((district) => {
            const url = `/imoveis/${district.stateSlug}/${district.citySlug}/${slug(
              district.nameSlug.toLowerCase()
            )}`
            return (
              <Link
                key={district.nameSlug}
                href={{
                  pathname: url,
                  asPath: url
                }}
              >
                <a title={`Comprar imóvel: ${district.name}`}>
                  Apartamentos em {district.name}
                </a>
              </Link>
            )
          })
        )
      }
    </Query>
  </NeighborhoodsLinks>
)

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
            {CITIES.map(({title, slug: citySlug, stateSlug}) => {
              const links = getCityNeighborhoodLinks(citySlug)
              return (
                <City>
                  <CityTitle>
                    <Text fontWeight="bold">
                      {title}
                    </Text>
                  </CityTitle>
                  <NeighborhoodContainer>
                    <NeighborhoodItems>
                      {NEIGHBORHOODS_BY_CITIES[citySlug].map(({name, ...props}) => (
                        <Link href={props.soon ? null : `/imoveis/${stateSlug}/${citySlug}/${slug(name.toLowerCase())}`}>
                          <Neighborhood {...props}>
                            <Text>{name}</Text>
                            {props.soon && <Soon />}
                          </Neighborhood>
                        </Link>
                      ))}
                      <Spacer>
                        {links}
                      </Spacer>
                    </NeighborhoodItems>
                  </NeighborhoodContainer>
                  <CityInfo>
                    {links}
                  </CityInfo>
                </City>
              )})}
          </Cities>
        </Content>
      </Container>
    )
  }
}
