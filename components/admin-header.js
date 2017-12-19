import { Component } from 'react'

export default class AdminHeader extends Component {
  render() {
    return <div>
      {this.props.children}
      <style jsx>{`
        div {
          align-items: center;
          display: flex;
          float: left;
          justify-content: space-between;
          overflow: auto;
          width: 100%
        }
        div :global(h1) {
          float: left;
        }
        div :global(a) {
          float: right;
          text-decoration: none;
        }
      `}</style>
    </div>
  }
}
