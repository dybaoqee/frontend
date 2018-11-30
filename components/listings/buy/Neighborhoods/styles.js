import styled from 'styled-components'
import theme from '@emcasa/ui'
import View from '@emcasa/ui-dom/components/View'
import {imageUrl} from 'utils/image_url'

export const Container = styled(View)`
  display: flex;
  width: 100%;
`

export const Content = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Header = styled(View)`
  .title {
    margin-bottom: 0;
  }
  
  @media (max-width: ${theme.breakpoints[0]}) {
    padding: 20px;
  }
`

export const Cities = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${theme.breakpoints[0]}) {
    align-items: unset;
  }
`


export const City = styled(View)`
  @media (max-width: ${theme.breakpoints[0]}) {
    margin-left: 20px;
  }
`

export const CityTitle = styled(View)`
`

export const NeighborhoodContainer = styled(View)`
  position: relative;
  
  @media (max-width: ${theme.breakpoints[0]}) {
    &:after {
      background: linear-gradient(
        to left,
        white, 
        transparent
      );
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

export const NeighborhoodItems = styled(View)`
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  @media (max-width: ${theme.breakpoints[0]}) {
    overflow-y: hidden;
    overflow-x: auto;
    padding-bottom: 10px;
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
  background: url(http://res.cloudinary.com/emcasa/image/upload/v1543531007/bairros/${
    props => props.thumb + (props.soon ? '-em-breve' : '')}.png) ${theme.colors.pink};
  background-size: cover;
  border-radius: 4px;
  box-shadow: 1px 2px 4px 0 rgba(0,0,0,0.3);
  margin-right: 10px;

  p {
    color: white;
    font-size: 20px;
  }

  @media (max-width: ${theme.breakpoints[0]}) {
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
  right: 10px;
  top: 10px;
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

  @media (max-width: ${theme.breakpoints[0]}) {
    top: 5px;
    right: 5px;

    max-width: 46px;
    max-height: 17px;
    font-size: 8px;
  }
`

export const Spacer = styled(View)`
  @media (max-width: ${theme.breakpoints[0]}) {
    &:after {
      display: flex;
      width: 20px;
      height: 30px;
      content: ' ';
    }
  }
`
