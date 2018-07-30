import styled from 'styled-components'
import {blue} from 'constants/colors'

export default styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  h3 {
    margin: 0;
  }

  p {
    margin: 10px;
  }

  button {
    width: 200px;
    margin: 20px auto;
  }

  a {
    text-decoration: none;
    color: ${blue.medium};
    margin: 20px auto;
  }
`
