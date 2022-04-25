const express = require('express');
const bodyParser = require('body-parser');
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

app.listen(PORT, () => {
  console.log('Online');
});
