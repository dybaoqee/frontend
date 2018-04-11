import Router from 'next/router'
import {removeCookie} from 'lib/session'

export default (target, ctx = {}) => {
  if (ctx.res) {
    // server
    // 303: "See other"
    ctx.res.writeHead(303, {Location: target})
    ctx.res.end()
  } else {
    removeCookie('redirectTo')
    if (target.indexOf('#as') > -1) {
      const url = target.split('#as#')
      Router.push(url[0], url[1])
    } else {
      Router.push(target)
    }
  }
}
