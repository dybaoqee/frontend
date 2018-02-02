import React from 'react'

import {mobileMedia} from 'constants/media'

export default class Lightbox extends React.Component {
  render() {
    const {handleClose} = this.props

    return <div className="lightbox">
      <button onClick={handleClose}>
        ×
      </button>

      {this.props.children}

      <style jsx>{`
        div.lightbox {
          background-color: rgba(0, 0, 0, 0.85);
          height: 100vh;
          left: 0;
          max-width: 100vw;
          position: fixed;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
          top: 0;
          width: 100vw;
          z-index: 9;
        }


        button {
          border: none;
          box-shadow: none;
          color: white;
          background: transparent;
          font-size: 48px;
          font-weight: 300;
          line-height: .8em;
          padding: 12px 20px 20px;
          position: absolute;
          right: 10px;
          top: 10px;
          z-index: 3;
          &:hover {
            background: rgba(255, 255, 255, 0.1);
          }
        }

        @media ${mobileMedia} {
          div.container {
            height: 300px;
          }

          div {
            width: 100vw;
          }
        }
      `}</style>
    </div>
  }
}
