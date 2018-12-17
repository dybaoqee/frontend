import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import theme from '@emcasa/ui'
import Row from '@emcasa/ui-dom/components/Row'
import Button from '@emcasa/ui-dom/components/Button'
import { isMobile } from 'lib/mobile'
import {
  Container
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
      <Container elevation={4} p={2} show={show} left={left} top={top}>
        {isMobile() && <Row>{title}</Row>}
        <Row>
          {this.props.children}
        </Row>
        <Row justifyContent="space-between" mt={2}>
          <Button p={0} link style={{color: theme.colors.dark, height: 32}} onClick={this.props.clear}>Limpar</Button>
          <Button p={0} link style={{height: 32}} onClick={this.props.apply}>Aplicar</Button>
        </Row>
      </Container>
    )
  }
}

FilterPanel.propTypes = {
  show: PropTypes.bool.isRequired,
  apply: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  panelPosition: PropTypes.object.isRequired
}

export default FilterPanel
