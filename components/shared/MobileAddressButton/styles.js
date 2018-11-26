import styled from 'styled-components'
import { themeGet } from 'styled-system'
import Button from '@emcasa/ui-dom/components/Button'
import Text from '@emcasa/ui-dom/components/Text'

const Container = styled(Button)`
  font-size: 18px;
  text-align: left;
  padding: 0 10px 0 10px;
`

const MobileAddressText = styled(Text)`
  white-space: nowrap;
  color: ${({hasAddress}) => hasAddress ? themeGet('colors.dark') : '#8291a8'};
`

const MobileAddressTextContainer = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`

export {
  Container,
  MobileAddressText,
  MobileAddressTextContainer
}
