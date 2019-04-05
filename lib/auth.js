import redirect from './redirect'
import {setCookie, getCookie, removeCookie} from './session'
import {
  authenticate
} from 'services/auth-api'
import {createUser} from 'services/user-api'
import {
  validateCredentials,
  validateNewUser
} from './validation'

export const signIn = async (email, password) => {
  try {
    validateCredentials(email, password)
    const res = await authenticate(email, password)
    setCookie('jwt', res.user.token)
    setCookie('loggedIn', 1)
    setCookie('currentUserId', res.user.id)
    setCookie('userRole', res.user.role)
    return res.user
  } catch (e) {
    throw e
  }
}

export const signUp = async (name, email, password, url, phone) => {
  try {
    validateNewUser(name, email, password)
    const res = await createUser(name, email, password, phone)
    const {user} = res.data
    setCookie('jwt', user.token)
    setCookie('currentUserId', user.id)
    setCookie('userRole', user.role)
    return user
  } catch (e) {
    throw e
  }
}

export const signUpUser = async ({jwt, id, role}) => {
  setCookie('jwt', jwt)
  setCookie('currentUserId', id)
  setCookie('userRole', role)
}

export const signOut = (ctx = {}) => {
  if (process.browser) {
    removeCookie('jwt')
    removeCookie('currentUserId')
    removeCookie('userRole')
    localStorage.removeItem('user')
    redirect('/', ctx)
  }
}

export const getJwt = (ctx) => {
  return getCookie('jwt', ctx.req)
}

const getUserRole = (ctx) => {
  return getCookie('userRole', ctx.req)
}

export const getCurrentUserId = (ctx) => getCookie('currentUserId', ctx.req)

export const isAuthenticated = (ctx) => !!getJwt(ctx)

export const isAdmin = (ctx) => getUserRole(ctx) == 'admin'
