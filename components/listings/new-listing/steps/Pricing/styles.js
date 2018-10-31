import styled from 'styled-components'
import { themeGet } from 'styled-system'

import Col from '@emcasa/ui-dom/components/Col'
import Button from '@emcasa/ui-dom/components/Button'

const UserPriceCol = styled(Col)`
  width: 100px;
`
const EditPriceButton = styled(Button)`
  margin-left: 20px;
`

export {
  UserPriceCol,
  EditPriceButton
}
