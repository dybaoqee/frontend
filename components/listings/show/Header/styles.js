import * as colors from 'constants/colors'
import styled from 'styled-components'

export default styled.header`
  height: 400px;
  position: relative;
  width: 100%;

  > div {
    position: absolute;
  }

  > div.open-image-gallery-overlay {
    cursor: pointer;
    height: 100%;
    width: 100%;
  }

  > div.bottom-right {
    bottom: 20px;
    right: 20px;
  }

  > div.top-right {
    top: 20px;
    right: 20px;
  }

  > button {
    margin-left: 20px;
  }
`
