import { Component } from 'react'

import { mobileMedia } from '../constants/media'

export default class TextContainer extends Component {
  render() {
    return (
      <div>
        {this.props.children}

        <style jsx>{`
          div {
            margin: 0 auto 100px;
            width: 700px;
          }

          @media ${mobileMedia} {
            div {
              width: calc(100vw - 40px);
            }
          }
        `}</style>

      </div>
    )
  }
}
