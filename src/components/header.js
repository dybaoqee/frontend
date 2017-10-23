import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return  <header>
      <Link to="/">
        <img src="/logo.png" alt="Main Logo"/>
      </Link>

      <div>
        <Link to='/jobs'>
          Trabalhe conosco
        </Link>
      </div>
    </header>

  }
}

export default Header
