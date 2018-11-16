import styled from 'styled-components'
import { themeGet } from 'styled-system'
import Button from '@emcasa/ui-dom/components/Button'
import Text from '@emcasa/ui-dom/components/Text'

const MobileAddressButton = styled(Button)`
  font-size: 18px;
  text-align: left;
  padding: 0 10px 0 10px;
`

const MobileAddresText = styled(Text)`
  white-space: nowrap;
  color: ${({hasAddress}) => hasAddress ? themeGet('colors.dark') : '#8291a8'};
  letter-spacing: 2px;
`

const MobileAddressTextContainer = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`

export {
  MobileAddressTextContainer,
  MobileAddressButton,
  MobileAddresText
}
