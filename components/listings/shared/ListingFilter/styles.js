import styled from 'styled-components'
import {themeGet} from 'styled-system'
import {headerMobileMedia} from 'constants/media'
import * as colors from 'constants/colors'
import Button from '@emcasa/ui-dom/components/Button'

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
  color: ${({active}) => active ? themeGet('colors.white') : themeGet('colors.pink')};
  font-size: ${themeGet('fontSizes.1')}px;
  margin: ${themeGet('space.1')}px;
`
