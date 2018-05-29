import moment from 'moment'
import Container, {MessageContainer} from './styles'
import UserAvatar from 'components/shared/User/Avatar'
import {getParagraphs} from 'utils/text-utils'
moment.locale('pt-BR')

export default ({message: {message, sender, insertedAt}, currentUser}) => (
  <Container>
    <UserAvatar user={sender} />
    <MessageContainer sender={sender.id == currentUser.id}>
      {getParagraphs(message).map((paragraph, i) => <p key={i}>{paragraph}</p>)}
      <span>
        {moment(insertedAt)
          .subtract(3, 'hours')
          .format('h:mm:ss a, DD MMM YYYY')}
      </span>
    </MessageContainer>
  </Container>
)
