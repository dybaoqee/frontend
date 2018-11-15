import styled from 'styled-components'
import { themeGet } from 'styled-system'
import Button from '@emcasa/ui-dom/components/Button'

const MobileAddressButton = styled(Button)`
  font-size: 18px;
  text-align: left;
  padding: 0 10px 0 10px;
  color: ${({hasAddress}) => hasAddress ? themeGet('colors.dark') : '#8291a8'};
  letter-spacing: 2px;
`

export {
  MobileAddressButton
}
