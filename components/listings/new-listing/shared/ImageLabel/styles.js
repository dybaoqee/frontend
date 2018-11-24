import styled from 'styled-components'

import View from '@emcasa/ui-dom/components/View'

const WIDTH = 155
const HEIGHT = 120

const Container = styled(View)`
  box-sizing: border-box;
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
`

const Tour = styled.div`
  background-image: url('/static/img/3d-tour.png');
  background-repeat: no-repeat;
  background-size: cover;
  width: 64px;
  height: 64px;

`

const Photos = styled.div`
  background-image: url('/static/img/camera.png');
  background-repeat: no-repeat;
  background-size: cover;
  width: 64px;
  height: 64px;
`

export {
  Container,
  Tour,
  Photos
}
