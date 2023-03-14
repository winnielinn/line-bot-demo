import { Schema, model } from 'mongoose';

interface ChineseJoke {
  language: string;
  description: string;
  answer: string;
}

const chineseJokeSchema = new Schema<ChineseJoke>({
  language: { type: String, required: true },
  description: { type: String, required: true },
  answer: { type: String, required: true, default: '' },
});

const ChineseJoke = model<ChineseJoke>('ChineseJoke', chineseJokeSchema);

export default ChineseJoke;
