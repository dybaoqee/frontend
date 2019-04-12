import {Component} from 'react'
import PropTypes from 'prop-types'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck'
import Button from '@emcasa/ui-dom/components/Button'
import Modal from 'components/shared/Modal'
import AccountKit from 'components/shared/Auth/AccountKit'
import {
  GreenBox,
  CheckContainer
} from './styles'

class ContactSuccess extends Component {
  constructor(props) {
    super(props)
  }

  onLoginSuccess = (userInfo, favoriteListing) => {

  }

  render() {
    return (
      <Modal onClose={this.props.onClose} unstyledCloseButton>
        <GreenBox>
          <CheckContainer>
            <FontAwesomeIcon icon={faCheck} />
          </CheckContainer>
          <View mt={4} px={4}>
            <Text color="white" fontWeight="bold" textAlign="center">Sucesso! Em breve um especialista entrará em contato com você</Text>
          </View>
        </GreenBox>
        <Row flexDirection="column" p={4}>
          <Col>
            <Text textAlign="center" fontSize="small">Enquanto isso, salve alguns imóveis. Isso nos ajuda a montar a lista de imóveis perfeita para você.</Text>
          </Col>
          <Col m="auto" mt={2}>
            <AccountKit
              appId={process.env.FACEBOOK_APP_ID}
              appSecret={process.env.ACCOUNT_KIT_APP_SECRET}
              version="v1.0"
              onSuccess={(userInfo) => {this.onLoginSuccess(userInfo, null)}}
              phoneNumber={this.props.userInfo.phone}
            >
              {({signIn}) => <Button onClick={signIn}>Salvar este imóvel</Button>}
            </AccountKit>
          </Col>
          <Col m="auto" mt={2}>
            <Button onClick={this.props.onClose}>Ver outros imóveis</Button>
          </Col>
        </Row>
      </Modal>
    )
  }
}

ContactSuccess.propTypes = {
  onClose: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired
}

export default ContactSuccess
