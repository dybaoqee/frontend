import styled from 'styled-components'
import {themeGet} from 'styled-system'
import {mobileMedia} from 'constants/media'
import * as colors from 'constants/colors'
import Text from '@emcasa/ui-dom/components/Text'

export default styled.div`
  box-sizing: border-box;
  padding: 0 14px;
`

export const Rail = styled.div`
  box-sizing: border-box;
  position: relative;
  height: 4px;
  border-radius: 6px;
  background-color: ${colors.lightestGray};
  box-shadow: inset 0 1px 0 0 rgba(0, 0, 0, 0.2);

  :before {
    box-sizing: border-box;
    content: '${({min}) => min}';
    display: ${({showValues}) => (showValues ? 'flex' : 'none')};
    color: ${colors.mediumGray};
    font-size: 18px;
    letter-spacing: -0.2px;
    line-height: 24px;
    position: absolute;
    transform: translate(-50%, 0);
    top: -40px;
  }

  :after {
    box-sizing: border-box;
    content: '${({max}) => max}';
    display: ${({showValues}) => (showValues ? 'flex' : 'none')};
    color: ${colors.mediumGray};
    font-size: 18px;
    letter-spacing: -0.2px;
    position: absolute;
    right: 0;
    top: -40px;
    transform: translate(50%, 0);
  }
`

export const Thumb = styled.div`
  box-sizing: border-box;
  position: absolute;
  cursor: pointer;
  outline: none;
  border-radius: 100%;
  padding: 0;
  margin: 0;
  top: -10px;
  height: 20px;
  width: 20px;
  background-color: ${themeGet('colors.pink')};
  display: flex;

  box-shadow: inset 0 0 0 1px ${themeGet('colors.pink')};

  :hover {
    box-shadow: inset 0 0 0 1px #094156, 0 4px 2px 0 rgba(0, 0, 0, 0.2),
      0 0 0 12px rgba(34, 126, 162, 0.15);
  }
`

export const Tip = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: -80px;
  border-radius: 3px;
  background-color: ${colors.blue.light};

  color: ${themeGet('colors.pink')};
  font-size: 20px;
  letter-spacing: -0.2px;
  line-height: 27px;
  padding: 5px;
  width: 130px;
  left: -50px;
  display: flex;

  justify-content: center;

  :after {
    user-select: none;
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: '';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-top-color: ${colors.blue.light};
    border-width: 10px;
    margin-left: -10px;
  }

  filter: drop-shadow(0px 2px 2px rgba(9, 58, 77, 0.3));
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
  height: 4px;
  background: ${themeGet('colors.pink')};
  width: 100%;
  position: absolute;
`
