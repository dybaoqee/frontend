import styled from 'styled-components'
import { themeGet } from 'styled-system'

import Icon from '@emcasa/ui-dom/components/Icon'
import View from '@emcasa/ui-dom/components/View'

const WIDTH = 155
const HEIGHT = 142

const Container = styled(View)`
  box-sizing: border-box;
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  border: 1px solid ${themeGet('colors.lightGrey')};
  border-radius: 4px;
  cursor: pointer;
`

const Bullet = styled.div`
  position: absolute;
  box-sizing: border-box;
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 50%;
  border: 2px solid ${themeGet('colors.grey')};
  width: 20px;
  height: 20px;
`

const CheckMark = styled(Icon)`
  position: absolute;
  box-sizing: border-box;
  margin-top: 10px;
  margin-left: 10px;
`

const Tour = styled.div`
  background-image: url('/static/img/3d-tour.png');
  background-repeat: no-repeat;
  background-size: cover;
  width: 50px;
  height: 50px;

`

const Photos = styled.div`
  background-image: url('/static/img/camera.png');
  background-repeat: no-repeat;
  background-size: cover;
  width: 50px;
  height: 50px;
`

export {
  Container,
  Bullet,
  CheckMark,
  Tour,
  Photos
}
