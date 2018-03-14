import redirect from './redirect'
import {setCookie, getCookie, removeCookie} from './session'
import {authenticate, confirmUser, resetPassword} from 'services/auth-api'
import {createUser} from 'services/user-api'
import {validateCredentials, validateNewUser, validateEmail} from './validation'

export const signIn = async (email, password) => {
  const errors = validateCredentials(email, password)
  if (errors) return errors

  try {
    const res = await authenticate(email, password)

    if (!res.user) {
      return res
    }
    setCookie('jwt', res.user.token)
    setCookie('currentUserId', res.user.id)
    setCookie('userRole', res.user.role)
    redirect('/')
    return null
  } catch (e) {
    return e
  }
}

export const signUp = async (name, email, password) => {
  const error = validateNewUser(name, email, password)
  if (error) {
    return error
  }
  try {
    const res = await createUser(name, email, password)

    if (!res.data) {
      return res
    }

    setCookie('success', `${name}, sua conta foi criada.`)
    redirect('/')
  } catch (e) {
    return e
  }
}

export const signOut = (ctx = {}) => {
  if (process.browser) {
    removeCookie('jwt')
    removeCookie('currentUserId')
    removeCookie('userRole')

    redirect('/', ctx)
  }
}

export const redefinePassword = async (email) => {
  const errors = validateEmail(email)
  if (errors) throw errors

  try {
    const res = await resetPassword(email)

    if (res.data) {
      return res.data
    }

    throw 'Ocorreu um erro ao receber seus dados. Tente novamente.'
  } catch (e) {
    throw e
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
