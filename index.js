const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const read = require('./helpers/read');
const write = require('./helpers/write');
const talkerFind = require('./helpers/talkerFinder');
const loginValid = require('./helpers/loginValid');
const tokenValidation = require('./helpers/tokenValidation');
const bodyValidation = require('./helpers/bodyvalidation');

const path = './talker.json';
const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const talkerText = await read(path) || [];
  response.status(HTTP_OK_STATUS).json(talkerText);
});

app.get('/talker/search', tokenValidation, async (request, response) => {
  const { q } = request.query;
  const arrayA = await read(path);
  console.log(arrayA);
  // if (!q) return response.status(200).json(['hm']);
  const newArray = arrayA.filter((e) => e.name.toLowerCase().includes(q.toLowerCase())); 
  console.log(newArray);
  // await write(newArray, path);
   response.status(HTTP_OK_STATUS).json(newArray);
 });

app.get('/talker/:id', talkerFind, async (req, response) => response.status(200).json(req.talker));

 app.post('/login', loginValid, async (req, response) => {
  const tk = crypto.randomBytes(16).toString('hex').substring(0, 16);
  response.status(HTTP_OK_STATUS).json({ token: tk });
});

app.post('/talker', tokenValidation, bodyValidation.bodyValidation,
bodyValidation.talkvalidation, bodyValidation.dateValidation,
bodyValidation.starsValidation, async (req, res) => {
const { name, age, talk } = req.body;
const newArray = await read(path);
const id = newArray.length + 1;
const newTalker = { name, id, age, talk };
newArray.push(newTalker);
await write(newArray, path);
res.status(201).json({ name, id, age, talk });
});

app.put('/talker/:id', talkerFind, tokenValidation, bodyValidation.bodyValidation,
bodyValidation.talkvalidation, bodyValidation.dateValidation,
bodyValidation.starsValidation, async (req, res) => {
const { name, age, talk } = req.body;
const { id } = req.talker;
const idnum = Number(id);
const newArray = await read(path);
newArray[idnum - 1] = { name, id: idnum, age, talk };
await write(newArray, path);
res.status(200).json({ name, id: idnum, age, talk });
});

app.delete('/talker/:id', tokenValidation, talkerFind, async (req, res) => {
const { id } = req.talker;
const idnum = Number(id);
const newArray = await read(path);
newArray.splice(idnum - 1, 1);
await write(newArray, path);
res.status(204).end();
});

app.listen(PORT, () => {
  console.log('Online');
});
