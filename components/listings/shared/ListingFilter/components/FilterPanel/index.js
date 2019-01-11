import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Button from '@emcasa/ui-dom/components/Button'
import Icon from '@emcasa/ui-dom/components/Icon'
import Text from '@emcasa/ui-dom/components/Text'
import {
  Container,
  Wrapper,
  ActionsWrapper,
  FilterOptions,
  MobileContent,
  DesktopContent
} from './styles'

class FilterPanel extends PureComponent {
  render() {
    let left = 0, top = 0
    const { filter, show, panelPosition } = this.props
    if (panelPosition) {
      left = panelPosition.left
      top = panelPosition.top
    }
    return (
      <Container elevation={4} show={show} left={left} top={top}>
        <Wrapper>
          <MobileContent>
            <Row justifyContent="flex-end" width={1} onClick={this.props.close}><Icon name="times" /></Row>
            <Row><Text>{filter.label}</Text></Row>
          </MobileContent>
          <FilterOptions>
            {this.props.children}
          </FilterOptions>
          <MobileContent>
            <ActionsWrapper>
              <Col width={1/3}>
                <Button fluid p={0} height="tall" color="dark" onClick={this.props.clear.bind(filter.code)}>Limpar</Button>
              </Col>
              <Col width={1/3} style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button fluid p={0} active height="tall" onClick={this.props.apply.bind(filter.code)}>Aplicar</Button>
              </Col>
            </ActionsWrapper>
          </MobileContent>
          <DesktopContent>
            <ActionsWrapper>
              <Col width={1/3}>
                <Button p={0} link height="short" color="dark" onClick={this.props.clear.bind(filter.code)}>Limpar</Button>
              </Col>
              <Col width={1/3} style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button p={0} link height="short" onClick={this.props.apply.bind(filter.code)}>Aplicar</Button>
              </Col>
            </ActionsWrapper>
          </DesktopContent>
        </Wrapper>
      </Container>
    )
  }
}

FilterPanel.propTypes = {
  filter: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  apply: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  panelPosition: PropTypes.object.isRequired
}

export default FilterPanel
