import Router from 'next/router'
import {removeCookie, getCookie} from 'lib/session'
import {objectToQueryString} from 'lib/request'

export default (target, ctx = {}, removeRedirectCookie = true, redirectTo) => {
  if (ctx.res) {
    if (redirectTo) {
      const query = redirectTo.query
        ? objectToQueryString(redirectTo.query)
        : ''
      ctx.res.cookie(
        'redirectTo',
        `${redirectTo.pathname}?${query}#as#${redirectTo.asPath}`
      )
    }

    ctx.res.redirect(303, target)
  } else {
    const redirectTo = getCookie('redirectTo')
    if (target.indexOf('#as') > -1) {
      const url = target.split('#as#')
      Router.push(url[0], url[1])
    } else if (redirectTo && redirectTo.indexOf('#as') > -1) {
      const url = target.split('#as#')
      Router.push(url[0], url[1])
    } else {
      Router.push(target)
    }
    if (removeRedirectCookie) removeCookie('redirectTo')
  }
}
