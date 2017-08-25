import React from 'react';
import { Route, Link } from 'react-router-dom'
import Listings from '../listings'

const App = () => (
  <div>
    <header>
      <Link to="/">
        <img src="logo.png" alt="Main Logo"/>
      </Link>
    </header>

    <main>
      <Route exact path="/" component={Listings} />
    </main>
  </div>
)

export default App
