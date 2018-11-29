import styled from 'styled-components'
import theme from '@emcasa/ui'
import View from '@emcasa/ui-dom/components/View'
import {imageUrl} from 'utils/image_url'

export const Container = styled(View)`
  display: flex;
  justify-content: center;
`

export const Content = styled(View)`
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  @media (max-width: ${theme.breakpoints[0]}) {
    padding-left: 20px;
    padding-right: 20px;
  }
`

export const Neighborhood = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 345px;
  height: 185px;
  cursor: pointer;
  background: url(http://res.cloudinary.com/emcasa/image/upload/v1543531007/bairros/${props => props.thumb + (props.soon ? '-em-breve' : '')}.png) ${theme.colors.pink};
  background-size: cover;
  border-radius: 6px;
  margin-right: 10px;
  
  p {
    color: white;
    font-size: 20px;
  }
`
