import {ApolloLink, Observable} from 'apollo-link'
import cookie from 'js-cookie'

const request = async (operation) => {
  operation.setContext({
    headers: {
      authorization: `Token ${await cookie.get('jwt')}`
    }
  })
}

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle
      Promise.resolve(operation)
        .then(async (oper) => await request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          })
        })
        .catch(observer.error.bind(observer))

      return () => {
        if (handle) handle.unsubscribe()
      }
    })
)

export default requestLink
