import React, { Component } from 'react'

class NewListing extends Component {
  static async getInitialProps(context) {
    return {
      shortLogo: true,
      renderFooter: false,
      hideSeparator: true
    }
  }

  render() {
    return (
      null
    )
  }
}

export default NewListing
