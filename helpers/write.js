const fs = require('fs').promises;

const writeTalker = (talker, file) => fs.writeFile(file, JSON.stringify(talker));

module.exports = writeTalker;