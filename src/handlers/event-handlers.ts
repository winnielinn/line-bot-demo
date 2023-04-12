import {
  Client,
  ClientConfig,
  WebhookEvent,
  MessageAPIResponseBase,
  TextMessage,
} from '@line/bot-sdk';
import * as dotenv from 'dotenv';

import Logger from '../utils/logger';
import menuMessage from '../messages/flex-message';
import welcomeMessage from '../messages/text-message';
import { getEnglishJokes, getChineseJokes } from './text-handler';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const logger = Logger.getLogger('text-event-handler');

// Create a new LINE SDK client.
const clientConfig: ClientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new Client(clientConfig);

// Function handler to receive the text.
const eventHandler = async (event: WebhookEvent): Promise<MessageAPIResponseBase | undefined> => {
  try {
    // Exclude remaining events
    if (event.type !== 'message' && event.type !== 'follow') {
      return;
    }

    // Process all message related variables here.
    const { replyToken } = event;

    logger.info(`使用者 id: ${event.source.userId}`);

    // when user join bot
    if (event.type === 'follow') {
      await client.replyMessage(replyToken, [welcomeMessage]);
      return;
    }

    // Reply to the user.
    if (event.type === 'message') {
      const { message } = event;
      switch (message.type) {
        case 'text': {
          const { text }: TextMessage = message;
          if (text === '隨機中文笑話') {
            const chineseJoke = (await getChineseJokes()) as TextMessage;
            await client.replyMessage(replyToken, chineseJoke);
          } else if (text === '隨機英文笑話') {
            const englishJoke = (await getEnglishJokes()) as TextMessage;
            await client.replyMessage(replyToken, englishJoke);
          } else {
            await client.replyMessage(replyToken, menuMessage);
          }
          break;
        }
        default:
          await client.replyMessage(replyToken, menuMessage);
      }
    }
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

export default eventHandler;
