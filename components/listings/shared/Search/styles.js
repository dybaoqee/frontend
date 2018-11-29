import styled from 'styled-components'
import {headerMobileMedia} from 'constants/media'
import {
  desktopFilterHeight,
  desktopHeaderAndFilterHeight
} from 'constants/dimensions'
import * as colors from 'constants/colors'

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
  height: 62px;
  margin-top: 60px;

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

export const FiltersApplied = styled.div`
  box-sizing: border-box;
  max-width: 100%;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  user-select: none;

  p {
    box-sizing: border-box;
    margin: 0;
    flex: 1;
    color: ${colors.mediumGray};
    font-size: 14px;
  }

  > * {
    box-sizing: border-box;
  }

  @media ${headerMobileMedia} {
    > :first-child,
    > :last-child {
      > :nth-child(n + 2) {
        display: none;
      }
    }
  }
`

export const FiltersAppliedContainer = styled.div`
  flex: 1;
  display: flex;
  box-sizing: border-box;
  min-width: 100px;
  overflow-x: scroll;

  > :nth-last-child(n + 2) {
    margin-right: 5px;
  }

  @media ${headerMobileMedia} {
    max-width: 90%;
    overflow: scroll;
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

export const FilterButton = styled.div`
  color: ${colors.blue.medium};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  text-transform: uppercase;
  box-sizing: border-box;
  font-weight: 600;
  user-select: none;

  span {
    white-space: nowrap;
  }

  svg {
    width: 20px !important;
    height: 20px;
    margin: 5px;
  }
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

export const Overlay = styled.div`
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  cursor: pointer;
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
