import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import moment from 'moment'
import Container, {Topic, Title} from './styles'
import faClipboard from '@fortawesome/fontawesome-pro-light/faClipboardCheck'
import faEye from '@fortawesome/fontawesome-pro-light/faEye'
import faHeart from '@fortawesome/fontawesome-pro-light/faHeart'
import faCalendar from '@fortawesome/fontawesome-pro-light/faCalendarAlt'

export default ({
  listing: {visualisations, favorite_count, interest_count, inserted_at}
}) => (
  <Container>
    <Topic>
      <FontAwesomeIcon icon={faClipboard} />
      <Title>
        <p>Data de criação</p>
        <p>{moment(inserted_at).format('DD/MM/YYYY')}</p>
      </Title>
    </Topic>
    <Topic>
      <FontAwesomeIcon icon={faEye} />
      <Title>
        <p>Visualizações</p>
        <p>{visualisations}</p>
      </Title>
    </Topic>
    <Topic>
      <FontAwesomeIcon icon={faHeart} />
      <Title>
        <p>Favoritado</p>
        <p>{favorite_count}</p>
      </Title>
    </Topic>
    <Topic>
      <FontAwesomeIcon icon={faCalendar} />
      <Title>
        <p>Visitas Marcadas</p>
        <p>{interest_count}</p>
      </Title>
    </Topic>
  </Container>
)
