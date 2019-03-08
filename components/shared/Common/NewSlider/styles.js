import styled from 'styled-components'
import theme from 'config/theme'
import Row from '@emcasa/ui-dom/components/Row'
import {
  MAX_FILTER_PANEL_DESKTOP_WIDTH
} from 'components/listings/shared/ListingFilter/components/FilterPanel/styles'

export const THUMB_SIZE = 18

export const Container = styled(Row)`
  flex-direction: column;
  align-items: flex-start;
  width: ${MAX_FILTER_PANEL_DESKTOP_WIDTH}px;
  max-width: ${MAX_FILTER_PANEL_DESKTOP_WIDTH}px;
  box-sizing: border-box;
  margin: 0 auto ${theme.space[2]}px;
`

export const Rail = styled.div`
  box-sizing: border-box;
  position: relative;
  height: 1px;
  width: 100%;
  max-width: 100%;
  background-color: ${theme.colors.grey};
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
  height: ${THUMB_SIZE}px;
  width: ${THUMB_SIZE}px;
  background-color: ${theme.colors.pink};
  display: flex;
  z-index: ${({isOnTheFront}) => isOnTheFront ? 1 : null};

  box-shadow: 0 0 0 1px ${theme.colors.pink};

  :hover {
    box-shadow: 0 0 0 12px rgba(245, 0, 87, 0.15), 0 0 0 1px ${theme.colors.pink};
  }
`

export const Icon = styled.div`
  box-sizing: border-box;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.pink};

  svg {
    width: 40px !important;
    height: 40px;
  }
`

export const RangeValues = styled.div`
  display: grid;
  ${({multiValue}) => multiValue && `
    grid-template-columns: minmax(33%, 1fr) auto minmax(33%, 1fr);
  `}
  width: 100%;
  margin: 0 auto 20px;
  text-align: center;
`

export const Value = styled.span`
  color: ${theme.colors.gray};
  text-align: ${({textAlign}) => textAlign};
  font-size: 14px;
  margin: ${({margin}) => margin ? `0 ${theme.space[2]}px` : null};
`

export const Bar = styled.div`
  position: absolute;
  max-width: 100%;
  height: 3px;
  background: ${theme.colors.pink};
`
