import React from 'react'
import PropTypes from 'prop-types'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'
import Button from '@emcasa/ui-dom/components/Button'
import Icon from '@emcasa/ui-dom/components/Icon'
import Container, {Title, Content} from './styles'
import {
  log,
  getListingInfoForLogs,
  LISTING_DETAIL_EXPAND_DESCRIPTION
} from 'lib/logging'

class ListingDescription extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
    this.toggleBody = this.toggleBody.bind(this)
  }

  toggleBody() {
    if (!this.state.expanded) {
      log(LISTING_DETAIL_EXPAND_DESCRIPTION, getListingInfoForLogs(this.props.listing))
    }
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const {
      listing,
      paragraphs
    } = this.props
    const {expanded} = this.state

    return (
      <Container flexDirection="column" mt={[5, null, null, 0]}>
        <Title fontWeight="bold">O imóvel</Title>
        <Content flexDirection="column" expanded={expanded}>
          {paragraphs && paragraphs.map((paragraph, i) => <Text fontSize={[1, null, null, 2]} key={i}>{paragraph}</Text>)}
        </Content>
        <Button expanded={expanded} onClick={this.toggleBody}>
          <Icon name={expanded ? 'chevron-up' : 'chevron-down'}/>
          {expanded ? 'Fechar' : 'Ler mais'}
        </Button>
      </Container>
    )
  }
}

ListingDescription.propTypes = {
  listing: PropTypes.object.isRequired,
  paragraphs: PropTypes.array
}

export default ListingDescription
