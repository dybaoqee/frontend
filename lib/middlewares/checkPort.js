const fetch = require('isomorphic-unfetch')
module.exports = async (port) => {
  const res = await fetch(`http://localhost:${port}`)
  return res
}
