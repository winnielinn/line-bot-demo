import generateEngilshJoke from '../util/daddy-joke';
import Logger from '../util/logger';

const logger = Logger.getLogger('text-handler');

async function getEnglishJokes() {
  let reply = '';
  try {
    reply = await generateEngilshJoke();
  } catch (err) {
    logger.error(err);
    reply = '目前無法獲取到英文笑話，請稍等一下下，再重試一次 ^_^';
  }

  return {
    type: 'text',
    text: reply,
  };
}

export default getEnglishJokes;
