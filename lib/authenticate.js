// Helpers
import fetchAPI from './fetch-api'

export default (async function authenticate() {
  const token = getToken()
  if (!token) return {}

  const user = await getUser(token)
  return { ...user, token }
})

export function getToken() {
  const Cookies = require('js-cookie')
  const { token } = Cookies.get()
  return token
}

export async function getUser(token) {
  let res

  try {
    res = await fetchAPI('/api/www/user', token, {
      throwOnHTTPError: true
    })
  } catch (err) {
    if (err.status && 403 === err.status) {
      return {}
    }
    throw err
  }

  return res
}
