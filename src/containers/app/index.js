import React from 'react';
import {Helmet} from "react-helmet"
import { Route } from 'react-router-dom'
import Header from '../../components/header'
import Listings from '../listings'
import Listing from '../listings/show'
import Jobs from '../jobs'

const App = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="description" content="Compre seu imóvel na Zona Sul do Rio de Janeiro." />
      <meta name="og:image" content="www.example.com/teste" />
      <title>EmCasa</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>

    <Header />

    <main>
      <Route exact path="/" component={Listings} />
      <Route path="/listings/:id" component={Listing}/>
      <Route exact path="/jobs" component={Jobs} />
    </main>
  </div>
)

export default App
