import React, { PureComponent } from 'react'
import { fas } from '@fortawesome/fontawesome-pro-solid'
import Icon from '@emcasa/ui-dom/components/Icon'

class Arrow extends PureComponent {
  render() {
    return (
      <Icon
        name="chevron-circle-right"
        type={fas}
        color="blue"
        mr={2}
        style={{
          display: 'inline',
          verticalAlign: 'sub'
        }}
      />
    )
  }
}

export default Arrow
