import styled from 'styled-components'
import theme from 'config/theme'
import {breakpoint} from '@emcasa/ui/lib/styles'
import View from '@emcasa/ui-dom/components/View'
import Text from '@emcasa/ui-dom/components/Text'

export const Container = styled(View)`
  display: flex;
  width: 100%;
`

export const Content = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Title = Text.withComponent('h2')
export const SubTitle = Text.withComponent('h3')
export const ListTitle = Text.withComponent('h4')

export const Header = styled(View)`
  ${Title} {
    margin-bottom: 0;
  }

  @media ${breakpoint.down('tablet')} {
    padding: 20px;
  }
`

export const Cities = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${breakpoint.down('tablet')} {
    align-items: unset;
  }
`

export const City = styled(View)`
  @media ${breakpoint.down('tablet')} {
    margin-left: 20px;
  }
`

export const CityTitle = styled(View)``

export const CityInfo = styled(View)`
  @media ${breakpoint.down('tablet')} {
    display: none;
  }
`

export const NeighborhoodContainer = styled(View)`
  position: relative;

  @media ${breakpoint.down('tablet')} {
    &:after {
      background: linear-gradient(to left, white, rgba(255, 255, 255, 0));
      content: ' ';
      position: absolute;
      top: 0;
      right: 0;
      width: 20%;
      height: 100%;
      pointer-events: none;
    }
  }
`

export const NeighborhoodsLinks = styled(View)`
  display: flex;
  flex-wrap: wrap;
  max-width: 1000px;
  max-height: 130px;
  margin-top: ${theme.space[3]}px;
  margin-bottom: ${theme.space[3]}px;
  flex-direction: column;

  .NeighborhoodLink {
    font-family: FaktSoftPro-Normal;
    color: ${theme.colors.grey};
    font-size: 14px;
    text-decoration: none;
    width: 345px;
    margin: 0 ${theme.space[3]}px 0 0;

    ${ListTitle} {
      margin: 0;
      font-size: inherit;
      color: inherit;
    }
  }

  @media ${breakpoint.down('tablet')} {
    max-height: 70px;
    .NeighborhoodLink {
      width: 130px;
      font-size: 8px;
      margin: 0 ${theme.space[2]}px 0 0;
    }
  }
`

export const NeighborhoodItems = styled(View)`
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  @media ${breakpoint.down('tablet')} {
    overflow-y: hidden;
    overflow-x: auto;
    padding-bottom: ${theme.space[3]}px;
  }
`

export const Neighborhood = styled(View)`
  position: relative;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 345px;
  height: 185px;
  max-width: 100%;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 1px 2px 4px 0 rgba(0, 0, 0, 0.3);
  margin-right: ${theme.space[2]}px;

  p {
    color: white;
    font-size: 20px;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  @media ${breakpoint.down('tablet')} {
    width: auto;
    min-width: 130px;
    min-height: 70px;
    height: auto;

    p {
      font-size: 100%;
    }
  }
`

export const Soon = styled(View)`
  position: absolute;
  right: ${theme.space[3]}px;
  top: ${theme.space[3]}px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.pink};
  width: 95px;
  height: 32px;
  border-radius: 4px;

  font-family: 'FaktSoftPro-Normal';
  color: white;
  font-size: 90%;

  &:after {
    content: 'Em breve';
  }

  @media ${breakpoint.down('tablet')} {
    top: 5px;
    right: 5px;

    max-width: 46px;
    max-height: 17px;
    font-size: 8px;
  }
`

export const Spacer = styled(View)`
  display: none;
  @media ${breakpoint.down('tablet')} {
    display: flex;
    max-height: 70px;
    &:after {
      display: flex;
      width: 20px;
      height: 30px;
      content: ' ';
    }
  }
`
