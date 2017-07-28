import React, { Component } from 'react'
// import { push } from 'react-router-redux'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  fetchPostsIfNeeded
} from '../../modules/listings/index'

class Listings extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPostsIfNeeded());
  }

  render() {
    return (<div>
        <h1>Listings Page</h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isFetching: state.listings.isFetching,
})

// const mapDispatchToProps = dispatch => bindActionCreators({
//   fetchPostsIfNeeded,
//   changePage: () => push('/listings')
// }, dispatch)

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Listings)
