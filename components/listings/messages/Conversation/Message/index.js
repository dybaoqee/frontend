import moment from 'moment'
import Container, {MessageContainer} from './styles'
import UserAvatar from 'components/shared/User/Avatar'
moment.locale('pt-BR')

export default ({message: {message, sender, insertedAt}, currentUser}) => (
  <Container>
    <UserAvatar user={sender} />
    <MessageContainer sender={sender.id == currentUser.id}>
      <p>{message}</p>
      <span>{moment(insertedAt).format('h:mm:ss a, DD MMM YYYY')}</span>
    </MessageContainer>
  </Container>
)
