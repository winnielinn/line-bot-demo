// Import all dependencies, mostly using destructuring for better view.
import { middleware, MiddlewareConfig, WebhookEvent } from '@line/bot-sdk';
import express, { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import Logger from './util/logger';
import eventHandler from './handlers/event-handlers';
import connectToDatabase from './database/mongoose';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
const logger = Logger.getLogger('index.ts');
// Setup all LINE client and Express configurations.

const middlewareConfig: MiddlewareConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET || '',
};

const PORT = process.env.PORT || 3000;

// Create a new Express application.
const app: Application = express();
connectToDatabase();

// Register the LINE middleware.
// eslint-disable-next-line max-len
// As an alternative, you could also pass the middleware in the route handler, which is what is used here.
app.use(middleware(middlewareConfig));

// Route handler to receive webhook events.
// This route is used to receive connection tests.
app.get(
  '/',
  async (_: Request, res: Response): Promise<Response> => res.status(200).json({
    status: 'success',
    message: 'Connected successfully!',
  }),
);

// This route is used for the Webhook.
app.post('/webhook', async (req: Request, res: Response): Promise<Response> => {
  const { events } = req.body;

  // Process all of the received events asynchronously.
  const results = await Promise.all(
    // eslint-disable-next-line consistent-return
    events.map(async (event: WebhookEvent) => {
      try {
        await eventHandler(event);
      } catch (err: unknown) {
        if (err instanceof Error) {
          logger.error(err);
        }

        // Return an error message.
        return res.status(500).json({
          status: 'error',
        });
      }
    }),
  );

  // Return a successfull message.
  return res.status(200).json({
    status: 'success',
    results,
  });
});

// Create a server and listen to it.
app.listen(PORT, () => {
  logger.info(`Application is live and listening on port ${PORT}`);
});
