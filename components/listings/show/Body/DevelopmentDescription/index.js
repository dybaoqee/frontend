import React from 'react'
import PropTypes from 'prop-types'
import Button from '@emcasa/ui-dom/components/Button'
import Icon from '@emcasa/ui-dom/components/Icon'
import Container, {P, Title, Content, BottomRow} from './styles'

class ListingDescription extends React.Component {
  state = {
    expanded: false
  }

  toggleBody = () => {
    this.setState({ expanded: !this.state.expanded }, () => {
      if (this.state.expanded && this.props.onExpand) this.props.onExpand()
      if (!this.state.expanded && this.props.onCollapse) this.props.onCollapse()
    })
  }

  render() {
    const {
      title,
      paragraphs,
      children
    } = this.props
    const {expanded} = this.state

    return (
      <Container flexDirection="column">
        <Title as="h3" fontWeight="bold">
          <span>{title}</span>
        </Title>
        <Content expanded={expanded} flexDirection="column">
          {paragraphs &&
            paragraphs.map((paragraph, i) => (
              <P fontSize={[1, null, null, 2]} key={i}>
                {paragraph}
              </P>
            ))}
          {children}
        </Content>
        <BottomRow expanded={expanded}>
          <Button expanded={expanded} onClick={this.toggleBody}>
            <Icon name={expanded ? 'chevron-up' : 'chevron-down'} />
            {expanded ? 'Fechar' : 'Ler mais'}
          </Button>
        </BottomRow>
      </Container>
    )
  }
}

ListingDescription.propTypes = {
  paragraphs: PropTypes.array
}

export default ListingDescription
