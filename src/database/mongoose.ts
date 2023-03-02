import * as dotenv from 'dotenv';
import { MongoClient, Db } from 'mongodb';
import Logger from '../util/logger';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const logger = Logger.getLogger('mongodb-connection');
const uri: string = process.env.MONGODB_URI || '';

async function connectToDatabase(): Promise<Db> {
  try {
    const client: MongoClient = await MongoClient.connect(uri);
    logger.info('MongoDB connected successfully');
    const database: Db = client.db();
    return database;
  } catch (err) {
    logger.error(`MongoDB connected failed. Error: ${err}`);
    process.exit(1);
  }
}

export default connectToDatabase;
