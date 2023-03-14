import * as dotenv from 'dotenv';
import { connect } from 'mongoose';
import ChineseJoke from '../chinese-joke';
import * as joke from './chinese.joke.json';
import Logger from '../../util/logger';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
const logger = Logger.getLogger('chinese-joke-seeder');
const uri: string = process.env.MONGODB_URI || '';

async function seedData() {
  try {
    await connect(uri);
    const jokeList = joke.results;
    await ChineseJoke.insertMany(jokeList);
    logger.info('joke seed data created successfully!');
    process.exit(0);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

seedData();
