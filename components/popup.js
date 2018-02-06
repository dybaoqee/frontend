import React from 'react'

class Popup extends React.Component {
  render() {
    return (
      <div className="popup">
        <div>
          <button onClick={this.props.handleClose}>×</button>
          {this.props.children}
        </div>

        <style jsx>{`
          .popup {
            align-items: center;
            background-color: rgba(0,0,0,0.7);
            display: flex;
            position: fixed;
            height: 100vh;
            justify-content: center;
            left: 0;
            top: 0;
            width: 100vw;
            z-index: 10;
          }
          .popup > div {
            background-color: white;
            border-radius: 6px;
            max-width: calc(100% - 80px);
            padding: 20px;
            position: relative;
            text-align: center;
            width: 500px;
          }

          button {
            background-color: transparent;
            border: none;
            border-radius: 6px;
            box-shadow: none;
            color: #8c8c8c;
            float: right;
            font-size: 40px;
            font-weight: lighter;
            line-height: 36px;
            padding: 4px 12px 10px;
            position: absolute;
            right: 0;
            top: 0;
          }

          button:hover {
            background-color: #f0f0f0;
          }

        `}</style>
      </div>
    )
  }
}

export default Popup
