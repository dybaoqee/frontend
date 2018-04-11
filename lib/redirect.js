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
    Router.replace(target)
  }
}
