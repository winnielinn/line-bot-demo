import ChineseJoke from '../models/chinese-joke';
import generateEngilshJoke from '../util/daddy-joke';
import Logger from '../util/logger';

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
    const rawJoke = await ChineseJoke.aggregate([{ $sample: { size: 1 } }]);
    if (!rawJoke) {
      reply = 'OMG 現在突然沒有笑話提供了捏 🙈\n歡迎發 PR 來擴充笑話庫呀 📤';
    }
    const chineseJoke = rawJoke[0];
    reply = chineseJoke.answer !== ''
      ? `請問${chineseJoke.description}\n${chineseJoke.answer}`
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
