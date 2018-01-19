import React, { Component } from 'react'
import Link from 'next/link'

import { mobileMedia } from '../constants/media'
import * as colors from '../constants/colors'

export default class Header extends Component {
  state = {
    isMobileNavVisible: false
  }

  toggleMobileNavVisibility = () => {
    const newState = !this.state.isMobileNavVisible
    this.setState({ isMobileNavVisible: newState })
  }

  render() {
    const { authenticated } = this.props
    const { isMobileNavVisible } = this.state

    return (
      <header>
        <Link href="/">
          <a><img src="/static/logo.png" alt="Main Logo"/></a>
        </Link>

        <button onClick={this.toggleMobileNavVisibility}>☰</button>

        <div className={isMobileNavVisible ? 'visible' : ''}>
          {authenticated && <Link href="/listings/new" as="/imoveis/adicionar">
            <a>Adicionar Imóvel</a>
          </Link>}

          <Link href="/indique">
            <a>Indique e Ganhe</a>
          </Link>

          <Link href="/jobs">
            <a>Trabalhe Conosco</a>
          </Link>

          {authenticated && <Link href="/auth/logout">
            <a>Logout</a>
          </Link>}
        </div>

        <style jsx>{`
          header {
            align-items: center;
            background: white;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 20px;
            position: fixed;
            top: 0;
            width: calc(100% - 40px);
            z-index: 1;
          }
          img {
            width: 110px;
          }

          button {
            display: none;
          }

          > div {
            float: right;
            margin-right: 10px;
            margin-top: 2px;
          }
          div a {
            color: ${colors.blue};
            margin-left: 20px;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          a:visited {
            color: ${colors.blue};
          }

          @media ${mobileMedia} {
            header > div {
              display: none;
              flex: 0 0 calc(100% + 20px);
              flex-direction: column;
              margin-left: -10px;
            }

            header > div.visible {
              display: flex;
            }

            header > div > a:first-of-type {
              border-top: 1px solid ${colors.offWhite};
              margin-top: 5px;
            }
            header > div > a {
              border-bottom: 1px solid ${colors.offWhite};
              margin: 0;
              padding: 10px;
            }

            button {
              background: transparent;
              color: gray;
              display: block;
              font-size: 17px;
              margin-top: -3px;
              margin-right: 9px;
              transform: scale(1.5, 1);
              padding-left: 5px;
              padding-right: 5px;
            }

            button:hover {
              background: ${colors.offWhite};
              color: gray;
            }
          }
        `}</style>
      </header>
    )
  }
}
