import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  index
} from '../../modules/listings'

class Listings extends Component {
  render() {
    return (<div>
        <h1>Listings Page</h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  indexRequested: state.listings.indexRequested,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  index,
  changePage: () => push('/listings')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Listings)
