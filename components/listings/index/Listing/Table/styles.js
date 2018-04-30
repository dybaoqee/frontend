import styled from 'styled-components'
import {mobileMedia} from 'constants/media'

export default styled.div`
  table {
    border-bottom: 1px solid #eee;
    font-size: 13px;
    margin: 20px 0 0;
    width: 100%;
  }

  table tr td {
    border-top: 1px solid #eee;
    padding: 4px 10px;
  }

  table tr td:nth-of-type(2n) {
    font-weight: bold;
    text-align: right;
  }

  table tr td:nth-of-type(2n-1) {
    color: #8c8c8c;
  }

  @media ${mobileMedia} {
    table {
      width: 100vw;
    }
  }
`
