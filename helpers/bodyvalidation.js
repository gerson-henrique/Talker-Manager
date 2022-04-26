const bodyValidation = (req, res, next) => {
  const { name, age } = req.body;
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).json({
     message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (age < 18) {
    return res.status(400).json({
     message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
    };

const talkvalidation = (req, res, next) => {
  const { talk } = req.body;
 if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
      return res.status(400).json({
         message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
       }); 
     }
  next(); 
};

const dateValidation = (req, res, next) => {
  const { talk } = req.body;
  const dateparts = talk.watchedAt.split('/');

  if (dateparts.length !== 3
    || dateparts[0].length !== 2
    || dateparts[1].length !== 2
    || dateparts[2].length !== 4) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const starsValidation = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  const starnum = Number(rate);
  if (Number.isNaN(starnum) || starnum > 5 || starnum < 1) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

module.exports = {
  talkvalidation,
  bodyValidation,
  starsValidation,
  dateValidation,
};