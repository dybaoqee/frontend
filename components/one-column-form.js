import {Component} from 'react'

import {mobileMedia} from 'constants/media'
import * as colors from 'constants/colors'

export default class OneColumnForm extends Component {
  render() {
    const {handleSubmit} = this.props

    return (
      <form onSubmit={handleSubmit}>
        {this.props.children}

        <style global jsx>{`
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
        `}</style>

        <style jsx>{`
          form {
            margin: 0 auto 100px;
            padding-top: 40px;
            width: 400px;
          }

          @media ${mobileMedia} {
            form {
              width: calc(100vw - 40px);
            }
          }
        `}</style>
      </form>
    )
  }
}
