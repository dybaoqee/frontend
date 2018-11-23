import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import NextLink from 'next/link'

import { PointerText } from './styles'

class Link extends PureComponent {
  render() {
    return (
      <NextLink
        href={this.props.href}
        as={this.props.as}
      >
        <PointerText inline color="pink">{this.props.children}</PointerText>
      </NextLink>
    )
  }
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  as: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default Link
