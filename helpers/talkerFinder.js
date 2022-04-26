const read = require('./read');

const talkerFind = async (req, res, next) => {
  const { id } = req.params;
  const aid = Number(id);
  const allTalkers = await read('./talker.json') || [];
  const idTalker = allTalkers.find((e) => e.id === aid);
  if (!idTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  req.talker = idTalker;
  next();
};

module.exports = talkerFind;