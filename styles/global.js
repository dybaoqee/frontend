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

.listings-filter-container {
  align-items: center;
  background: white;
  border-bottom: 1px solid ${colors.lightGray};
  display: flex;
  overflow: visible;
  padding: 10px 0;
  position: fixed;
  width: 100vw;
  z-index: 4;
  box-sizing: border-box;
  &.filter-open {
    box-shadow: 1px 1px 4px ${colors.lightGray};
  }

  .Select-control {
    border-color: ${colors.blue.medium};
  }

  .Select-placeholder {
    color: ${colors.mediumGray};
    text-align: center;
  }

  .Select.has-value.is-clearable.Select--single
    > .Select-control
    .Select-value {
    padding-right: 20px;
  }

  div.active-filter-overlay {
    background: rgba(100, 100, 100, 0.85);
    height: calc(100vh - 135px);
    position: absolute;
    top: 58px;
    left: 0;
    width: 100vw;
  }

  div.filter-param-container {
    position: relative;
  }

  div.option-container {
    background: white;
    border: 1px solid ${colors.lightGray};
    border-top: 1px solid white;
    height: calc(100vh - 170px);
    justify-content: space-between;
    margin-right: 40px;
    padding: 20px;
    position: absolute;
    top: 47px;

    > div {
      align-items: center;
      display: flex;
    }

    label {
      color: ${colors.blue.medium};
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      &:last-of-type {
        margin: 0 10px;
      }
    }

    span.close-filter-param {
      color: ${colors.blue.medium};
      display: block;
      cursor: pointer;
      float: right;
      font-size: 12px;
      font-weight: 700;
      margin-top: 15px;
      text-transform: uppercase;
      &:hover {
        color: ${colors.blue.dark};
      }
    }
  }

  label {
    margin-right: 10px;
    &.neighborhood {
      clear: both;
      float: left;
      width: 100% !important;
    }
    &:first-of-type {
      display: inline-block;
    }
  }

  input {
    margin-right: 10px;
    padding: 10px;
  }

  select {
    margin-right: 10px;
  }

  button {
    background: transparent;
    border: 1px solid ${colors.lightGray};
    border-radius: 500px;
    box-shadow: none;
    color: ${colors.text};
    clear: both;
    font-size: 15px;
    margin: 0 20px 0 0;
    padding: 7px 20px 10px;
    &:hover {
      background: ${colors.offWhite};
    }
    &.active {
      background: ${colors.blue.medium};
      color: white;
      border: 1px solid ${colors.blue.dark};
      &:hover {
        background: ${colors.blue.dark};
      }
    }
  }

  span.mobile-param-title {
    display: none;
  }

  span.remove-all-filters {
    color: ${colors.blue.medium};
    cursor: pointer;
    display: block;
    font-size: 13px;
    letter-spacing: 1px;
    margin-left: auto;
    margin-right: 20px;
    overflow: auto;
    text-transform: uppercase;
    &:hover {
      color: ${colors.mediumDarkGray};
    }
    &.mobile {
      display: none;
    }
  }
}

@media ${mobileMedia} {
  .listings-filter-container {
    flex-wrap: wrap;

    div.active-filter-overlay {
      background: white;
    }

    span.remove-all-filters {
      display: none;
      &.mobile {
        display: block;
        margin-right: 0;
      }
    }

    span.mobile-param-title {
      color: ${colors.mediumDarkGray};
      display: block;
      font-size: 11px;
      font-weight: 700;
      margin-bottom: 10px;
      text-transform: uppercase;
    }

    div.filter-param-container {
      width: 100vw;

      button {
        display: none;
      }
    }

    div.option-container {
      border: none;
      border-top: 1px solid ${colors.lightGray};
      height: auto;
      margin-right: 0;
      margin-top: 10px;
      padding: 15px 10px 15px;
      position: relative;
      top: 0;

      span.close-filter-param {
        display: none;
      }
    }

    label {
      font-size: 13px;
    }

    button.close-mobile-filters {
      background: ${colors.blue.medium};
      border: 1px solid ${colors.blue.dark};
      bottom: 10px;
      color: white;
      left: 10px;
      margin: 0 auto;
      position: fixed;
      width: calc(100vw - 20px);
      z-index: 3;
      &:hover {
        background: ${colors.blue.dark};
      }
    }
  }
}
`
