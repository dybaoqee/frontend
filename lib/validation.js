export const validateNewUser = (name, email, password) => {
  if (!name) {
    return 'Nome é obrigatório.'
  }

  if (!password) {
    return 'Senha é muito curta.'
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
