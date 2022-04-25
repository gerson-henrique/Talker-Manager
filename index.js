const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const read = require('./helpers/readAndEdit/read');

const EmailValidation = (enteredEmail) => {
  if (!enteredEmail.includes('@') || !enteredEmail.includes('.com')) {
    return false;
  }
  return true;
};

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const INPUT_ER_STATUS = 400;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const talkerText = await read('./talker.json') || [];
  response.status(HTTP_OK_STATUS).json(talkerText);
});

app.get('/talker/:id', async (req, response) => {
  const { id } = req.params;
  const aid = Number(id);
  const alltAlkers = await read('./talker.json') || [];
  console.log(alltAlkers);
  const idTalker = alltAlkers.find((e) => e.id === aid);
  console.log(idTalker);
  if (!idTalker) {
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return response.status(200).json(idTalker);
 });

 app.post('/login', async (req, response) => {
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
    const isValidEmail = EmailValidation(email);
    if (!isValidEmail) {
    return response.status(INPUT_ER_STATUS).json({
      message: 'O "email" deve ter o formato "email@email.com"' });
  }
  const tk = crypto.randomBytes(16).toString('hex').substring(0, 16);
  response.status(HTTP_OK_STATUS).json({ token: tk });
});

app.listen(PORT, () => {
  console.log('Online');
});
