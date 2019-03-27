import redirect from './redirect'
import {setCookie, getCookie, removeCookie} from './session'
import {
  authenticate,
  confirmUser
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
    redirect(getCookie('redirectTo') || '/')
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
    redirect(getCookie('redirectTo') || '/')
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

export const confirm = async (token) => {
  try {
    const res = await confirmUser(token)
    if (res.data.user) {
      const {user} = res.data
      return user
    }
    throw 'Ocorreu um erro ao confirmar sua conta. Tente novamente.'
  } catch (e) {
    throw e
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

export const redirectIfAuthenticated = (ctx) => {
  if (isAuthenticated(ctx)) {
    redirect('/', ctx)
    return true
  }
  return false
}
