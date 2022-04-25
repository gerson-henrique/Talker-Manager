const fs = require('fs').promises;

const read = async (url) => {
  try {
    const text = await fs.readFile(url, 'utf8');
    return JSON.parse(text);
  } catch (error) {
    return null;
  }
};

module.exports = read;