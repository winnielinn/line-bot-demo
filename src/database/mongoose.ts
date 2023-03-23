import * as dotenv from 'dotenv';
import { connect } from 'mongoose';
import Logger from '../util/logger';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const logger = Logger.getLogger('mongodb-connection');
const uri: string = process.env.MONGODB_URI || '';

async function connectToDatabase() {
  try {
    await connect(uri);
    logger.info('MongoDB connected successfully');
  } catch (err) {
    logger.error(`MongoDB connected failed. Error: ${err}`);
    process.exit(1);
  }
}

export default connectToDatabase;
