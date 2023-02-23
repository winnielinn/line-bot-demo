import { TextMessage } from '@line/bot-sdk';

export const welcomeMessage: TextMessage = {
  type: 'text',
  text: '歡迎透過下方選單來使用最受歡迎的冷笑話機器人 —— 小雯 BOT 🤖'
}

export const replyMessage: TextMessage = {
  type: 'text',
  text: '來點笑話讓你和別人當麻吉麻 👯',
};
