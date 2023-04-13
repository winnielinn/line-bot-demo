import generateChineseJoke from '../utils/chinese-joke';
import generateEngilshJoke from '../utils/daddy-joke';
import Logger from '../utils/logger';

const logger = Logger.getLogger('text-handler');

async function getEnglishJokes() {
  let reply = '';
  try {
    reply = await generateEngilshJoke();
  } catch (err) {
    logger.error(err);
    reply = '目前無法獲取到英文笑話，請稍等一下下，再重試一次 🐒\n或是請填寫回饋表單回報此狀況 🐛';
  }

  return {
    type: 'text',
    text: reply,
  };
}

async function getChineseJokes() {
  let reply = '';
  try {
    const chineseJoke = await generateChineseJoke();
    reply = chineseJoke.answer !== ''
      ? `Q: ${chineseJoke.description}\nA: ${chineseJoke.answer}`
      : `${chineseJoke.description}`;
  } catch (err) {
    logger.error(err);
    reply = '目前笑話庫出現異常，請稍等一下下，再重試一次 🐒\n或是請填寫回饋表單回報此狀況 🐛';
  }

  return {
    type: 'text',
    text: reply,
  };
}

export { getEnglishJokes, getChineseJokes };
