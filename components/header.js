import Link from 'next/link'

const Header = () => (
  <header>
    <Link href="/">
      <a><img src="/static/logo.png" alt="Main Logo"/></a>
    </Link>

    <div>
      <Link href="/jobs">
        <a>Trabalhe Conosco</a>
      </Link>
    </div>

    <style jsx>{`
      header {
        align-items: center;
        background: white;
        display: flex;
        justify-content: space-between;
        padding: 10px;
        position: fixed;
        width: calc(100vw - 20px);
        z-index: 1;
      }
      img {
        width: 110px;
      }
      > div {
        float: right;
        margin-right: 10px;
        margin-top: 2px;
      }
      div a {
        color: #2c6e8e;
        margin-left: 20px;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      a:visited {
        color: $blue;
      }
    `}</style>
  </header>
)

export default Header

