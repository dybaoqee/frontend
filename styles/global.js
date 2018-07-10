import {injectGlobal} from 'styled-components'
import {mobileMedia} from 'constants/media'
import * as colors from 'constants/colors'
export default injectGlobal`
html {
  color: ${colors.text};
  font-size: 100%;
  -webkit-font-smoothing: antialiased;
}
body {
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Helvetica, Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.5;
}

a.GTAG {
  text-decoration: none;
  color: inherit;
}

button,
.btn {
  background-color: ${colors.blue.medium};
  border: 1px solid ${colors.blue.darker};
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  outline: none;
  padding: 10px 20px 12px;
  text-decoration: none;
  transition: background-color 0.1s ease;
  transform: 0.25;
  &:hover {
    background-color: ${colors.blue.dark};
    text-decoration: none;
  }
}
button.gray {
  background: ${colors.lightGray};
  &:hover {
    background: ${colors.lightGray};
  }
}
button.green {
  background: ${colors.green.medium};
  border: 1px solid ${colors.green.dark};
  color: white;
  &:hover {
    background: ${colors.green.dark};
  }
}
button.white {
  background: ${colors.offWhite};
  border: 1px solid ${colors.mediumGray};
  color: ${colors.text};
  &:hover {
    background: ${colors.lightestGray};
  }
}
button:disabled {
  opacity: 0.5;
}
input,
textarea {
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Helvetica, Arial, sans-serif;
}

form {
  div.control-group {
    margin-bottom: 20px;
  }
  input {
    border: 1px solid ${colors.lightGray};
    border-radius: 6px;
    font-size: 18px;
    padding: 14px;
    width: calc(100% - 30px);
  }
  button {
    font-size: 18px;
    padding: 10px 0;
    width: 100%;
  }
}

@media ${mobileMedia} {
  h1 {
    font-size: 22px;
  }
}
`
