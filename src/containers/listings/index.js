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
    console.log(this.props);
    const { index } = this.props;

    console.log(index);
    return (<div>
        <h1>Listings Page</h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isFetching: state.listings.isFetching,
  index: state.listings.index
})

// const mapDispatchToProps = dispatch => bindActionCreators({
//   fetchPostsIfNeeded,
//   changePage: () => push('/listings')
// }, dispatch)

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Listings)
