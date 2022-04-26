const emailValidation = require('./emailValidation');

const loginValid = (req, response, next) => {
  const INPUT_ER_STATUS = 400;
  const { email, password } = req.body;
  if (!email) {
    return response.status(INPUT_ER_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!password) {
    return response.status(INPUT_ER_STATUS).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return response.status(INPUT_ER_STATUS).json({
      message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    const isValidEmail = emailValidation(email);
    if (!isValidEmail) {
    return response.status(INPUT_ER_STATUS).json({
      message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

module.exports = loginValid;