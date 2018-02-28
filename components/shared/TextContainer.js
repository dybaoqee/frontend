import {Component} from 'react'

import {mobileMedia} from 'constants/media'
import {desktopHeaderHeight} from 'constants/dimensions'

export default class TextContainer extends Component {
  render() {
    const minHeightPadding = desktopHeaderHeight + 220

    return (
      <div>
        {this.props.children}

        <style jsx>{`
          div {
            margin: 0 auto 100px;
            min-height: calc(100vh - ${minHeightPadding}px);
            padding-top: 40px;
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
