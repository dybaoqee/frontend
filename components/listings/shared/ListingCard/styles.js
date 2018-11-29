import styled from 'styled-components'
import { themeGet } from 'styled-system'
import View from '@emcasa/ui-dom/components/View'

const Container = styled(View)`
  box-sizing: border-box;
  cursor: pointer;
  width: 310px;
  height: 270px;
  border: 1px solid ${themeGet('colors.lightGrey')};
  border-radius: ${themeGet('space.1')}px;
  margin-bottom: ${themeGet('space.2')}px;

  : hover {
    border: 1px solid ${themeGet('colors.pink')};
  }
`

const ListingImage = styled(View)`
  box-sizing: border-box;
  background-image: url(https://res.cloudinary.com/emcasa/image/upload/f_auto,c_fit,h_165,w_310/v1513818385/ikcfiwnugredccbd4zfj.jpg);
  width: 308px;
  height: 165px;
  border-radius: ${themeGet('space.1')}px ${themeGet('space.1')}px 0 0;
`

const LikeButtonContainer = styled.div`
  display: flex;
  position: absolute;
  right: 20px;
  top: 20px;
`

export {
  Container,
  ListingImage,
  LikeButtonContainer
}
