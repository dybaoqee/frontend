import React from 'react';
import { Route, Link } from 'react-router-dom'
import Listings from '../listings'
import Listing from '../listings/show'
import Jobs from '../jobs'

const App = () => (
  <div>
    <header>
      <Link to="/">
        <img src="/logo.png" alt="Main Logo"/>
      </Link>
    </header>

    <main>
      <Route exact path="/" component={Listings} />
      <Route path="/listings/:id" component={Listing}/>
      <Route exact path="/jobs" component={Jobs} />
    </main>
  </div>
)

export default App
