import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import theme from '@emcasa/ui'
import Row from '@emcasa/ui-dom/components/Row'
import Col from '@emcasa/ui-dom/components/Col'
import Button from '@emcasa/ui-dom/components/Button'
import Icon from '@emcasa/ui-dom/components/Icon'
import Text from '@emcasa/ui-dom/components/Text'
import { isMobile } from 'lib/mobile'
import {
  Container,
  Wrapper,
  ActionsWrapper,
  FilterOptions
} from './styles'

class FilterPanel extends PureComponent {
  render() {
    let left = 0, top = 0
    const { title, show, panelPosition } = this.props
    if (panelPosition) {
      left = isMobile() ? theme.space[4] : panelPosition.left
      top = panelPosition.top
    }
    return (
      <Container elevation={4} show={show} left={left} top={top}>
        <Wrapper>
          {isMobile() &&
            <Row justifyContent="flex-end" width={1}>
              <Button link pr={0} onClick={this.props.close}>
                <Icon name="times" />
              </Button>
            </Row>
          }
          {isMobile() && <Text>{title}</Text>}
          <FilterOptions>
            {this.props.children}
          </FilterOptions>
          <ActionsWrapper>
            <Col width={1/3}>
              <Button fluid={isMobile()} p={0} link={!isMobile()} height={isMobile() ? 'tall' : 'short'} color="dark" onClick={this.props.clear}>Limpar</Button>
            </Col>
            <Col width={1/3} style={{display: 'flex', justifyContent: 'flex-end'}}>
              <Button fluid={isMobile()} p={0} link={!isMobile()} active={isMobile()} height={isMobile() ? 'tall' : 'short'} onClick={this.props.apply}>Aplicar</Button>
            </Col>
          </ActionsWrapper>
        </Wrapper>
      </Container>
    )
  }
}

FilterPanel.propTypes = {
  show: PropTypes.bool.isRequired,
  apply: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  panelPosition: PropTypes.object.isRequired
}

export default FilterPanel
