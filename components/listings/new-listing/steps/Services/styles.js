import styled from 'styled-components'
import { themeGet } from 'styled-system'

import Button from '@emcasa/ui-dom/components/Button'

const SchedulingButton = styled(Button)`
  color: ${themeGet('colors.grey')};
`

export {
  SchedulingButton
}
