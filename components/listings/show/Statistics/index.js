import {Query} from 'react-apollo'
import {GET_LISTING_STATS} from 'graphql/listings/queries'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import moment from 'moment'
import Container, {Topic, Title, Icon} from './styles'
import faClipboard from '@fortawesome/fontawesome-pro-light/faClipboardCheck'
import faEye from '@fortawesome/fontawesome-pro-light/faEye'
import faHeart from '@fortawesome/fontawesome-pro-light/faHeart'
import faCalendar from '@fortawesome/fontawesome-pro-light/faCalendarAlt'
import faFlag from '@fortawesome/fontawesome-pro-light/faFlag'
import faHomeHeart from '@fortawesome/fontawesome-pro-light/faHomeHeart'
import faHome from '@fortawesome/fontawesome-pro-light/faHome'
import faExternalLink from '@fortawesome/fontawesome-pro-light/faExternalLink'
import ActivateListing from 'components/shared/Common/Buttons/Activate'
import Button from '@emcasa/ui-dom/components/Button'

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
          {user.admin && (
            <Topic>
              <Icon is_active={isActive}>
                <FontAwesomeIcon icon={faFlag} />
              </Icon>
              <Title>
                <p>Status</p>
                <ActivateListing listing={{id, isActive}} />
              </Title>
            </Topic>
          )}

          <Topic>
            <FontAwesomeIcon icon={faClipboard} />
            <Title>
              <p>Data de criação</p>
              <span>{moment(insertedAt).format('DD/MM/YYYY')}</span>
            </Title>
          </Topic>
          <Topic>
            <FontAwesomeIcon icon={faEye} />
            <Title>
              <p>Visualizações</p>
              <span>{listingVisualisationCount}</span>
            </Title>
          </Topic>
          <Topic>
            <FontAwesomeIcon icon={faHomeHeart} />
            <Title>
              <p>Visualizações Tour 3D</p>
              <span>{tourVisualisationCount}</span>
            </Title>
          </Topic>
          <Topic>
            <FontAwesomeIcon icon={faHeart} />
            <Title>
              <p>Favoritado</p>
              <span>{listingFavoriteCount}</span>
            </Title>
          </Topic>
          <Topic>
            <FontAwesomeIcon icon={faCalendar} />
            <Title>
              <p>Visitas Marcadas</p>
              <span>{interestCount}</span>
            </Title>
          </Topic>
          <Topic>
            <FontAwesomeIcon icon={faHome} />
            <Title>
              <p>Visitas Realizadas</p>
              <span>{inPersonVisitCount}</span>
            </Title>
          </Topic>
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
        </Container>
      )
    }}
  </Query>
)
