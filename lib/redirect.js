import Router from 'next/router'
import {removeCookie, getCookie} from 'lib/session'

export default (target, ctx = {}, removeRedirectCookie = true) => {
  if (ctx.res) {
    // server
    // 303: "See other"
    ctx.res.writeHead(303, {Location: target})
    ctx.res.end()
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
