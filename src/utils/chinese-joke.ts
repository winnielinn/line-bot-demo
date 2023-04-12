import fetch from 'node-fetch';
import Logger from './logger';

const logger = Logger.getLogger('chinese-joke.ts');

async function generateChineseJoke() {
  try {
    const options = {
      method: 'GET',
    };
    const response = await fetch(
      'https://quiet-atoll-68130.herokuapp.com/api/chinesejoke',
      options,
    );
    const chineseJoke = await response.json();
    return chineseJoke;
  } catch (err) {
    logger.error(err);
    return err;
  }
}

export default generateChineseJoke;
