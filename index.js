const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const read = require('./helpers/read');
const talkerFind = require('./helpers/talkerFinder');
const loginValid = require('./helpers/loginValid');
const tokenValidation = require('./helpers/tokenValidation');

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

app.get('/talker/:id', talkerFind, async (req, response) => response.status(200).json(req.talker));

 app.post('/login', loginValid, async (req, response) => {
  const tk = crypto.randomBytes(16).toString('hex').substring(0, 16);
  response.status(HTTP_OK_STATUS).json({ token: tk });
});

app.post('/talker', tokenValidation, async (req, res) => {
res.status(200).json('podcola dog');
});

app.listen(PORT, () => {
  console.log('Online');
});
