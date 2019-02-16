import {Query} from 'react-apollo'
import {GET_LISTING_STATS} from 'graphql/listings/queries'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import moment from 'moment'
import Container, {Topic, Title, Icon} from './styles'
import faClipboard from '@fortawesome/fontawesome-pro-light/faClipboardCheck'
import faEye from '@fortawesome/fontawesome-pro-light/faEye'
import faHeart from '@fortawesome/fontawesome-pro-light/faHeart'
import faCalendar from '@fortawesome/fontawesome-pro-light/faCalendarAlt'
import faHomeHeart from '@fortawesome/fontawesome-pro-light/faHomeHeart'
import faHome from '@fortawesome/fontawesome-pro-light/faHome'
import faExternalLink from '@fortawesome/fontawesome-pro-light/faExternalLink'
import Button from '@emcasa/ui-dom/components/Button'
import Text from '@emcasa/ui-dom/components/Text'

export default ({listing: {insertedAt, id, isActive}, user}) => (
  <Query query={GET_LISTING_STATS} variables={{id}} ssr={false}>
    {({loading, error, data}) => {
      if (loading || error) return null
      const {
        listingVisualisationCount,
        tourVisualisationCount,
        listingFavoriteCount,
        interestCount,
        inPersonVisitCount
      } = data.listing

      return (
        <Container>
          <Topic>
            <FontAwesomeIcon icon={faClipboard} />
            <Title>
              <Text>Data de criação</Text>
              <Text inline>{moment(insertedAt).format('DD/MM/YYYY')}</Text>
            </Title>
          </Topic>
          <Topic>
            <FontAwesomeIcon icon={faEye} />
            <Title>
              <Text>Visualizações</Text>
              <Text inline>{listingVisualisationCount}</Text>
            </Title>
          </Topic>
          <Topic>
            <FontAwesomeIcon icon={faHomeHeart} />
            <Title>
              <Text>Visualizações Tour 3D</Text>
              <Text inline>{tourVisualisationCount}</Text>
            </Title>
          </Topic>
          <Topic>
            <FontAwesomeIcon icon={faHeart} />
            <Title>
              <Text>Favoritado</Text>
              <Text inline>{listingFavoriteCount}</Text>
            </Title>
          </Topic>
          <Topic>
            <FontAwesomeIcon icon={faCalendar} />
            <Title>
              <Text>Visitas Marcadas</Text>
              <Text inline>{interestCount}</Text>
            </Title>
          </Topic>
          <Topic>
            <FontAwesomeIcon icon={faHome} />
            <Title>
              <Text>Visitas Realizadas</Text>
              <Text inline>{inPersonVisitCount}</Text>
            </Title>
          </Topic>
          {user.admin && (
            <Topic>
              <FontAwesomeIcon icon={faExternalLink} />
              <Title>
                <a href={`${process.env.GARAGEM_URL}/imoveis/${id}`} target="_blank">
                  <Button link height="auto" p={0}>
                    Ver no garagem
                  </Button>
                </a>
              </Title>
            </Topic>
          )}
        </Container>
      )
    }}
  </Query>
)
