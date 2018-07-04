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
import ActivateListing from 'components/shared/Common/Buttons/Activate'

export default ({
  listing: {
    visualisations,
    favorite_count,
    interest_count,
    inserted_at,
    tour_visualisations,
    id,
    in_person_visit_count,
    is_active
  },
  user
}) => (
  <Container>
    {user.admin && (
      <Topic>
        <Icon is_active={is_active}>
          <FontAwesomeIcon icon={faFlag} />
        </Icon>
        <Title>
          <p>Status</p>
          <ActivateListing listing={{id, is_active}} />
        </Title>
      </Topic>
    )}

    <Topic>
      <FontAwesomeIcon icon={faClipboard} />
      <Title>
        <p>Data de criação</p>
        <span>{moment(inserted_at).format('DD/MM/YYYY')}</span>
      </Title>
    </Topic>
    <Topic>
      <FontAwesomeIcon icon={faEye} />
      <Title>
        <p>Visualizações</p>
        <span>{visualisations}</span>
      </Title>
    </Topic>
    <Topic>
      <FontAwesomeIcon icon={faHomeHeart} />
      <Title>
        <p>Visualizações Tour 3D</p>
        <span>{tour_visualisations}</span>
      </Title>
    </Topic>
    <Topic>
      <FontAwesomeIcon icon={faHeart} />
      <Title>
        <p>Favoritado</p>
        <span>{favorite_count}</span>
      </Title>
    </Topic>
    <Topic>
      <FontAwesomeIcon icon={faCalendar} />
      <Title>
        <p>Visitas Marcadas</p>
        <span>{interest_count}</span>
      </Title>
    </Topic>
    <Topic>
      <FontAwesomeIcon icon={faHome} />
      <Title>
        <p>Visitas Realizadas</p>
        <span>{in_person_visit_count}</span>
      </Title>
    </Topic>
  </Container>
)
