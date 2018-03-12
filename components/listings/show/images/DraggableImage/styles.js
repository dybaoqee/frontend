import styled from 'styled-components'

export default styled.div`
  width: 290px;
  height: 190px;
  margin-bottom: 2px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 2px 0 #ffffff, 0 4px 30px 0 rgba(38, 38, 38, 0.3);
  opacity: ${({isDragging}) => (isDragging ? 0 : 1)};
  cursor: ${({isDragging}) => (isDragging ? 'grabbing' : 'grab')};

  > div.trash {
    position: absolute;
    top: 10px;
    left: 15px;
    cursor: pointer;
    z-index: 10;
    color: white;
    text-shadow: 1px 1px 5px rgba(255, 0, 0, 0.5);
    svg {
      filter: drop-shadow(0 1px 1px black);
    }
  }
`

export const Image = styled.div`
  background-color: red;
  background-image: ${({img}) => img};

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
`
