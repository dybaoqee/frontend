import styled from 'styled-components'
import {blue} from 'constants/colors'

export default styled.div`
  margin-bottom: 10px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-gap: 10px;
  align-items: center;
  color: ${blue.darker};
  font-weight: 700;

  :before,
  :after {
    display: block;
    content: '';
    height: 1px;
    background: ${blue.darker};
  }
`
