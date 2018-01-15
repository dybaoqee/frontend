import redirect from './redirect'
import { setCookie, getCookie, removeCookie } from './session'
import { authenticate } from '../services/auth-api'
import { createUser } from '../services/user-api'
import { validateCredentials, validateNewUser } from './validation'

export const signIn = async (email, password) => {
  const error = validateCredentials(email, password)
  if (error) {
    return error
  }

  const res = await authenticate(email, password)
  if (!res.user.token) {
    return res
  }

  setCookie('jwt', res.user.jwt)
  setCookie('userId', res.user.id)
  setCookie('userRole', res.user.role)
  redirect('/')
  return null
}

export const signUp = async (name, email, password, password_confirmation) => {
  const error = validateNewUser(name, email, password, password_confirmation)
  if (error) {
    return error
  }

  const res = await createUser(name, email, password, password_confirmation)

  if (!res.data) {
    return res
  }

  setCookie("success", `${name}, your account was created`)
  redirect('/auth/login')
  return null
}

export const signOut = (ctx = {}) => {
  if (process.browser) {
    removeCookie('jwt')
    redirect('/auth/login', ctx)
  }
}

export const getJwt = ctx => {
  return getCookie('jwt', ctx.req)
}

export const getUserRole = ctx => {
  return getCookie('userRole', ctx.req)
}

export const isAuthenticated = ctx => !!getJwt(ctx)

export const isAdmin = ctx => getUserRole(ctx) == 'admin'

export const redirectIfAuthenticated = ctx => {
  if (isAuthenticated(ctx)) {
    redirect('/', ctx)
    return true
  }
  return false
}

export const redirectIfNotAuthenticated = ctx => {
  if (!isAuthenticated(ctx)) {
    redirect('/auth/login', ctx)
    return true
  }
  return false
}
