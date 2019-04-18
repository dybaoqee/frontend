import styled from 'styled-components'
import theme from '@emcasa/ui'
import View from '@emcasa/ui-dom/components/View'
import Input from '@emcasa/ui-dom/components/Input'

export const PinkBox = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 45%;
  background-color: ${theme.colors.pink};
`

export const Logo = styled.div`
  transform: translateZ(0);
  mask-image: url(https://s3.amazonaws.com/emcasa-ui/logo/symbol.svg);
  mask-repeat: no-repeat;
  mask-size: 120px;
  background-color: white;
  width: 120px;
  height: 120px;
`

export const StyledInput = styled(Input)`
  font-size: 14px;
  ::placeholder {
    color: ${theme.colors.extraDarkSmoke};
  }
`
