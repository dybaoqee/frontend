export const validateNewUser = (
  name,
  email,
  password
) => {
  if (!name) {
    return "Nome é obrigatório."
  }

  if (!password) {
    return "Senha é muito curta."
  }

  return validateCredentials(email, password)
}

export const validateCredentials = (email, password) => {
  if (!email || !password) {
    return "Email and password fields are required"
  }

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return "Email does not have right format.";
  }

  return null;
}
