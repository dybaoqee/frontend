import React from 'react';
import { Route } from 'react-router-dom'
import Header from '../../components/header'
import Listings from '../listings'
import Listing from '../listings/show'
import Jobs from '../jobs'

const App = () => (
  <div>

    <Header />

    <main>
      <Route exact path="/" component={Listings} />
      <Route path="/listings/:id" component={Listing}/>
      <Route exact path="/jobs" component={Jobs} />
    </main>
  </div>
)

export default App
