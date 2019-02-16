import styled from 'styled-components'
import theme from '@emcasa/ui'

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
  }
`

export const Close = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 6px;
  box-shadow: none;
  color: #8c8c8c;
  float: right;
  font-size: 40px;
  font-weight: lighter;
  line-height: 36px;
  padding: 4px 12px 10px;
  position: absolute;
  right: 0;
  top: 0;

  :hover {
    background-color: #f0f0f0;
  }
`
