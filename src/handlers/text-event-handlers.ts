import {
  Client,
  ClientConfig,
  WebhookEvent,
  MessageAPIResponseBase,
  TextMessage,
} from '@line/bot-sdk';
import * as dotenv from 'dotenv';
import Logger from '../util/logger';
import menuMessage from '../messages/flex-message';
import welcomeMessage from '../messages/text-message';

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
const textEventHandler = async (
  event: WebhookEvent,
): Promise<MessageAPIResponseBase | undefined> => {
  // Process all variables here.
  if (event.type !== 'message' && event.type !== 'follow') {
    return;
  }

  // Process all message related variables here.
  const { replyToken } = event;

  logger.info(`使用者 id: ${event.source.userId}`);

  // when user join bot
  if (event.type === 'follow') {
    return await client.replyMessage(replyToken, [welcomeMessage]);
  }

  // Reply to the user.
  if (event.type === 'message') {
    const { message } = event;
    switch (message.type) {
      case 'text':
        const { text }: TextMessage = message;
        logger.info('text', text);
        if (text === '隨機中文笑話') {
          logger.info('中文');
        } else if (text === '隨機英文笑話') {
          logger.info('English');
        } else {
          return await client.replyMessage(replyToken, menuMessage);
        }
        break;
      default:
        return await client.replyMessage(replyToken, menuMessage);
    }
  }
};

export default textEventHandler;
