import { Schema, model } from 'mongoose';

interface Joke {
  language: string;
  description: string;
  answer: string;
}

const chineseJokeSchema = new Schema<Joke>({
  language: { type: String, required: true },
  description: { type: String, required: true },
  answer: { type: String, required: true, default: '' },
});

const ChineseJoke = model<Joke>('ChineseJoke', chineseJokeSchema);

export default ChineseJoke;
