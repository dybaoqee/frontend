import styled from 'styled-components'
import theme from '@emcasa/ui'
import Button from '@emcasa/ui-dom/components/Button'
import { isMobile } from 'lib/mobile'

const StyledFilterButton = styled(Button)`
  position: relative;
  height: 32px;
  margin: 0 ${theme.space[2]}px ${theme.space[1]}px 0;
  border: 1px solid ${theme.colors.pink};
  background-color: ${({open}) => open ? theme.colors.pink : null};
  color: ${({active, open}) => active || open ? theme.colors.white : theme.colors.pink};
  font-size: ${theme.fontSizes[1]}px;

  ${({open}) => (open && !isMobile()) && `z-index: 1;`}

  &:last-child {
    margin-right: 0;
  }

  ${({open}) => open ? `
    &::before {
      content: '';
      position: absolute;
      z-index: 1;
      bottom: -26px;
      left: 50%;
      width: 15px;
      height: 15px;
      transform: translateX(-50%) rotate(-225deg);
      background-color: ${theme.colors.white};
      box-shadow: 0px 0px 8px -1px rgba(0,0,0,0.2);

      @media screen and (max-width: ${theme.breakpoints[0]}) {
        content: unset;
      }
    }
  `: null}

`

export {
  StyledFilterButton
}
