import {Component} from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faUser from '@fortawesome/fontawesome-free-solid/faUserCircle'
import Container, {Icon} from './styles'
import Link from 'next/link'
export default class UserMenu extends Component {
  state = {
    opened: false
  }

  handleMenu = () => {
    const {opened} = this.state
    this.setState({opened: !opened})
  }
  render() {
    const {items} = this.props
    const {opened} = this.state
    return (
      <Container opened={opened}>
        <Icon onClick={this.handleMenu}>
          <FontAwesomeIcon icon={faUser} />
        </Icon>

        <ul>
          {items.map(({title, href, as}) => (
            <li key={title}>
              <Link href={href} as={as}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    )
  }
}
