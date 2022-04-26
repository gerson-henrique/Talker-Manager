const tokenValidation = (req, res, next) => {
  const tokenTest = /^[a-zA-Z0-9]$/;
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (tokenTest.test(authorization) || authorization.length !== 16) {
   return res.status(401).json({
    message: 'Token inválido' }); 
  }
  next();
  };

module.exports = tokenValidation;