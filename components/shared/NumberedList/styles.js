import styled from 'styled-components'
import theme from '@emcasa/ui'
import Row from '@emcasa/ui-dom/components/Row'
import Text from '@emcasa/ui-dom/components/Text'

const SIZE = 30

export const Container = styled(Row)`
  width: 100%;
  flex-direction: column;
`

export const Item = styled(Row)`
  position: relative;
  box-sizing: border-box;
  margin: ${theme.space[2]}px 0 ${theme.space[2]}px 0;
`

const InlineText = Text.withComponent('span')

export const Number = styled(InlineText)`
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 ${SIZE}px;
  width: ${SIZE}px;
  height: ${SIZE}px;
  background: ${theme.colors.pink};
  border-radius: 100%;
  margin-right: ${theme.space[3]}px;

  ${({last}) => !last && `
    ::before {
      z-index: 0;
      content: '';
      position: absolute;
      top: ${SIZE}px;
      left: ${SIZE / 2}px;
      width: 0;
      height: 150%;
      border-right: 1px dashed #979797;
    }
  `}
`