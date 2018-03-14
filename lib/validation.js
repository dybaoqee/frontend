export const validateNewUser = (name, email, password) => {
  const errors = []
  if (!name) errors.push('Digite seu nome.')

  if (errors.length) {
    return errors
  }

  return validateCredentials(email, password)
}

export const validateCredentials = (email, password) => {
  const errors = []
  if (!email) errors.push('Digite seu e-mail.')

  if (!password) errors.push('Digite sua senha.')

  if (email && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errors.push('Digite um e-mail válido.')
  }

  return errors.length > 0 ? errors : null
}
