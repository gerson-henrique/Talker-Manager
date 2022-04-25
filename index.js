const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const read = require('./helpers/readAndEdit/read');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
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
//  const { email, password } = req.body;
  const tk = crypto.randomBytes(16).toString('hex').substring(0, 16);
  response.status(HTTP_OK_STATUS).json({ token: tk });
});

app.listen(PORT, () => {
  console.log('Online');
});
