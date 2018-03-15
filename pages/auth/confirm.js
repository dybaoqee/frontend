import {Component} from 'react'
import Layout from 'components/shared/Shell'
import Errors from 'components/shared/Common/Errors'
import _ from 'lodash'
import {confirm} from 'lib/auth'
import Container from 'components/shared/Common/Container'
import Link from 'next/link'

export default class Confirm extends Component {
  state = {
    error: null
  }

  static async getInitialProps(ctx) {
    const {token} = ctx.req.params

    const res = await confirm(token)

    if (!res.data.name) {
      return {
        error: res
      }
    }

    return {
      user: res.data
    }
  }

  render() {
    const {user, error} = this.props

    return (
      <Layout>
        <Container>
          {error ? (
            <Errors errors={[error]} />
          ) : (
            <div>
              <p>
                {`${_.capitalize(
                  user.name.split(' ')[0]
                )}, seu cadastro foi confirmado!`}
              </p>
              <p>
                Clique{' '}
                <Link href={'/login'}>
                  <a>aqui</a>
                </Link>{' '}
                para fazer login.
              </p>
            </div>
          )}
        </Container>
      </Layout>
    )
  }
}
