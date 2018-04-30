import styled from 'styled-components'

export default styled.div`
  div.nav {
    align-items: center;
    display: flex;
    color: white;
    cursor: pointer;
    float: left;
    font-size: 60px;
    height: 100%;
    padding: 0 30px;
    user-select: none;
    width: calc(50% - 60px);
    z-index: 10;
    &:hover {
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.333),
        rgba(0, 0, 0, 0)
      );
    }
    &:last-of-type {
      float: right;
      justify-content: flex-end;
      text-align: right;
      &:hover {
        background: linear-gradient(
          to left,
          rgba(0, 0, 0, 0.333),
          rgba(0, 0, 0, 0)
        );
      }
    }
  }

  div.image {
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    z-index: -1;
  }
`
