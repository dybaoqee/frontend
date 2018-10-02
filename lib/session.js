import cookie from 'js-cookie'
import moment from 'moment'
import _ from 'lodash'

export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: moment()
        .add(10, 'years')
        .toDate(),
      path: '/'
    })
  }
}

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1
    })
  }
}

export const getCookie = (key, req) => {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req)
}

const getCookieFromBrowser = (key) => {
  return cookie.get(key)
}

const getCookieFromServer = (key, req) => {
  const reqCookie = _.get(req, 'headers.cookie')
  if (!reqCookie) {
    return undefined
  }

  const rawCookie = reqCookie
    .split(';')
    .find((c) => c.trim().startsWith(`${key}=`))

  if (!rawCookie) {
    return undefined
  }

  return rawCookie.split('=')[1]
}
