import React, { PureComponent } from 'react'
import Icon from '@emcasa/ui-dom/components/Icon'

class Arrow extends PureComponent {
  render() {
    return <Icon type="circle-right" color="blue" mr={2} style={{verticalAlign: 'sub'}} />
  }
}

export default Arrow
