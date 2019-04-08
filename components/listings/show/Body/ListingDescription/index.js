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
      toggleBody
    } = this.props

    return (
      <Container expanded={expanded} mt={[5, null, null, 0]}>
        {false && <ToggleButton expanded={expanded} onClick={toggleBody} />}
        <Title fontWeight="bold">O imóvel</Title>
        {paragraphs && paragraphs.map((paragraph, i) => <Text fontSize={[1, null, null, 2]} key={i}>{paragraph}</Text>)}
      </Container>
    )
  }
}

ListingDescription.propTypes = {
  expanded: PropTypes.bool.isRequired,
  listing: PropTypes.object.isRequired,
  paragraphs: PropTypes.array,
  toggleBody: PropTypes.func.isRequired
}

export default ListingDescription
