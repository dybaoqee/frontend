import React from 'react'
import PropTypes from 'prop-types'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'
import ToggleButton from '../ToggleButton'
import Container, {Title} from './styles'

class ListingDescription extends React.Component {
  render() {
    const {
      title
    } = this.props
    const {
      expanded,
      listing,
      paragraphs,
      toggleBody,
      user
    } = this.props

    return (
      <Container expanded={expanded} mt={[5, null, null, 0]}>
        <ToggleButton expanded={expanded} onClick={toggleBody} />
        <Title fontWeight="normal">O imóvel</Title>
        {paragraphs && paragraphs.map((paragraph, i) => <Text key={i}>{paragraph}</Text>)}
        {user.admin &&
          <View my={4} style={{textAlign: 'center'}}>
            <a href={`${process.env.GARAGEM_URL}/imoveis/${listing.id}`} target="_blank">
              <Button link height="auto" p={0}>
                Ver no garagem
              </Button>
            </a>
          </View>
        }
      </Container>
    )
  }
}

ListingDescription.propTypes = {
  expanded: PropTypes.bool.isRequired,
  listing: PropTypes.object.isRequired,
  paragraphs: PropTypes.object,
  toggleBody: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default ListingDescription
