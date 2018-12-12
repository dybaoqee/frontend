import styled from 'styled-components'
import {themeGet} from 'styled-system'
import {mobileMedia} from 'constants/media'
import * as colors from 'constants/colors'
import Text from '@emcasa/ui-dom/components/Text'

export const Container = styled.div`
  box-sizing: border-box;
  padding: 0 14px;
`

export const Rail = styled.div`
  box-sizing: border-box;
  position: relative;
  height: 1px;
  background-color: ${themeGet('colors.grey')};
`

export const Thumb = styled.div`
  box-sizing: border-box;
  position: absolute;
  cursor: pointer;
  outline: none;
  border-radius: 100%;
  padding: 0;
  margin: 0;
  top: -8px;
  height: 18px;
  width: 18px;
  background-color: ${themeGet('colors.pink')};
  display: flex;

  box-shadow: 0 0 0 1px ${themeGet('colors.pink')};

  :hover {
    box-shadow: 0 0 0 12px rgba(34, 126, 162, 0.15), 0 0 0 1px ${themeGet('colors.pink')};
  }
`

export const Tip = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: -80px;

  color: ${themeGet('colors.pink')};
  font-size: 20px;
  letter-spacing: -0.2px;
  line-height: 27px;
  padding: 4px;
  width: 130px;
  left: -50px;
  display: flex;

  justify-content: center;
  align-items: center;
`

export const Tutorial = styled.div`
  box-sizing: border-box;
  pointer-events: none;
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: -52px;
  top: -5px;
  width: 130px;
  animation: highlight 1s linear infinite alternate;
  transform-origin: center center;
  opacity: 0;
  @keyframes highlight {
    to {
      width: 150px;
      opacity: 1;
      left: -60px;
    }
  }
`

export const Icon = styled.div`
  box-sizing: border-box;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${themeGet('colors.pink')};

  svg {
    width: 40px !important;
    height: 40px;
  }
`

export const RangeValues = styled(Text)`
  box-sizing: border-box;
  text-align: center;
  margin: 0 10px 20px 10px;
  color: ${colors.mediumDarkGray};
`

export const Bar = styled.div`
  height: 3px;
  background: ${themeGet('colors.pink')};
  width: 100%;
  position: absolute;
`
