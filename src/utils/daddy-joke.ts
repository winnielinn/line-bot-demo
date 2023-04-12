import fetch from 'node-fetch';
import Logger from './logger';

const logger = Logger.getLogger('daddy-joke.ts');

async function generateEngilshJoke() {
  try {
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    };
    const response = await fetch('https://icanhazdadjoke.com/', options);
    const englishJoke = await response.json();
    return englishJoke.joke;
  } catch (err) {
    logger.error(err);
    return err;
  }
}

export default generateEngilshJoke;
