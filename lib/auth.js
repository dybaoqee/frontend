import redirect from './redirect'
import {setCookie, getCookie, removeCookie} from './session'
import {authenticate, confirmUser} from 'services/auth-api'
import {createUser} from 'services/user-api'
import {validateCredentials, validateNewUser} from './validation'

export const signIn = async (email, password) => {
  const error = validateCredentials(email, password)
  if (error) {
    return error
  }

  const res = await authenticate(email, password)
  if (!res.user.token) {
    return res
  }

  setCookie('jwt', res.user.token)
  setCookie('currentUserId', res.user.id)
  setCookie('userRole', res.user.role)
  redirect('/')
  return null
}

export const signUp = async (name, email, password) => {
  const error = validateNewUser(name, email, password)
  if (error) {
    return error
  }

  const res = await createUser(name, email, password)

  if (!res.data) {
    return res
  }

  setCookie('success', `${name}, sua conta foi criada.`)
  redirect('/')
  return null
}

export const signOut = (ctx = {}) => {
  if (process.browser) {
    removeCookie('jwt')
    removeCookie('currentUserId')
    removeCookie('userRole')

    redirect('/', ctx)
  }
}

export const confirm = (token) => {
  return confirmUser(token)
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

export const redirectIfAuthenticated = (ctx) => {
  if (isAuthenticated(ctx)) {
    redirect('/', ctx)
    return true
  }
  return false
}

export const redirectIfNotAuthenticated = (ctx) => {
  if (!isAuthenticated(ctx)) {
    redirect('/login', ctx)
    return true
  }
  return false
}

export const redirectIfNotAdmin = (ctx) => {
  if (!isAdmin(ctx)) {
    redirect('/login', ctx)
    return false
  }
  isAdmin(ctx)
}
