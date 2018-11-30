import styled from 'styled-components'
import {headerMobileMedia} from 'constants/media'
import {
  desktopFilterHeight,
  desktopHeaderAndFilterHeight
} from 'constants/dimensions'
import * as colors from 'constants/colors'
import Button from '@emcasa/ui-dom/components/Button'
import {themeGet} from 'styled-system'

import {getWindowHeight} from 'utils/polyfills/bounding-rect'

export const Container = styled.div`
  align-items: center;
  background: white;
  display: flex;
  overflow: visible;
  padding: 10px;
  width: 100vw;
  z-index: 4;
  box-sizing: border-box;

  .Select-control {
    border-color: ${colors.blue.medium};
  }

  .Select-placeholder {
    color: ${colors.mediumGray};
    text-align: center;
  }

  .Select.has-value.is-clearable.Select--single
    > .Select-control
    .Select-value {
    padding-right: 20px;
  }
`

export const FilterApplied = styled.div`
  box-sizing: border-box;
  color: white;
  background: ${colors.blue.medium};
  border: 1px solid ${colors.blue.darker};
  border-radius: 20px;
  font-weight: 600;
  font-size: 14px;
  padding: 9px;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    white-space: nowrap;
  }

  svg {
    width: 15px !important;
    height: 15px;
    margin-left: 5px;
    cursor: pointer;
  }

  @media ${headerMobileMedia} {
    padding: 5px;
  }
`

export const FilterButton = styled(Button)`
  border: 1px solid ${themeGet('colors.pink')};
  color: ${themeGet('colors.pink')};
  font-size: ${themeGet('fontSizes.1')}px;
  margin: ${themeGet('space.1')}px;
`

export const FiltersWrapper = styled.div`
  display: ${({active}) => active ? 'flex' : 'none'};
  box-sizing: border-box;
  height: calc(
    ${process.browser ? getWindowHeight() + 'px' : '100vh'} -
      ${desktopHeaderAndFilterHeight}px
  );
  position: absolute;
  top: ${desktopFilterHeight}px;
  left: ${({active}) => (active ? 0 : '100%')};
  width: 100vw;
`

export const Filters = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 400px;
  background: white;
  border-bottom: 1px solid ${colors.lightestGray};
  padding: 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  > :first-child {
    box-sizing: border-box;
    max-height: 88%;
    overflow-y: scroll;
  }

  @media ${headerMobileMedia} {
    width: 100%;
    padding: 15px;
  }
`

export const FilterContainer = styled.div`
  box-sizing: border-box;
  max-width: 500px;
  margin-bottom: 20px;

  h4 {
    font-weight: 600;
    font-size: 14px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    user-select: none;
    margin: 0 0 10px 0;

    svg {
      width: 15px !important;
      height: 15px;
      cursor: pointer;
    }
  }
`

export const PropertyTypes = styled.div`
  display: flex;
  box-sizing: border-box;
  border: 1px solid ${colors.blue.medium};
  color: ${colors.blue.medium};
  border-radius: 4px;
  font-weight: 600;

  > :nth-last-child(n + 2) {
    border-right: 1px solid ${colors.blue.daker};
  }

  ${({activeTypes}) =>
    activeTypes &&
    activeTypes.map(
      (type) => `
    > [aria-label=${type}]{
        background: ${colors.blue.medium};
        color: white;
    }
`
    )};
`

export const PropertyType = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  padding: 10px;
  width: 100px;
  height: 60px;
  user-select: none;
  cursor: pointer;
  flex: 1;

  svg {
    width: 20px !important;
    height: 20px;
  }
`
