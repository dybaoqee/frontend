import styled from 'styled-components'
import {breakpoint} from '@emcasa/ui/lib/styles'
import Button from '@emcasa/ui-dom/components/Button'

export default styled.div`
  box-sizing: border-box;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  position: fixed;
  height: 100vh !important;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100vw;
  z-index: 10;

  > div {
    box-sizing: border-box;
    background-color: white;
    border-radius: 2px;
    max-width: calc(100% - 40px);
    position: relative;
    text-align: center;
    margin-bottom: 0px !important;

    ${({full, media}) =>
      full &&
      media &&
      `@media ${media}{
        max-width: 100vw;
        width: 100vw;
        border-radius: 0px;
      }`};

    > ${Button} {
      position: fixed;
      z-index: 1;

      @media screen and ${breakpoint.up('tablet')} {
        position: absolute;
      }
    }
  }
`
