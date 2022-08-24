// load env variables from .env file
import * as dotenv from 'dotenv';
dotenv.config();

import axios from "axios";
import { CallbackQueryType, TelegramCommand } from '../types/Telegram';

const baseUrl = 'https://api.telegram.org/bot'
const token = process.env.TELEGRAM_TOKEN;

const generateButton = (text: string, type: CallbackQueryType, value: string) => {
  return { text, callback_data: JSON.stringify({ type, value }) };
};

export const sendMessage = async (chat_id: number, text: string): Promise<void> => {

  const method = 'sendMessage';
  const url = `${baseUrl}${token}/${method}`;

  await axios({
    method: 'post',
    url,
    data: { chat_id, text }
  });
};

export const getMyCommands = async () => {
  const method = 'getMyCommands';
  const url = `${baseUrl}${token}/${method}`;

  const commands = await axios.get(url);

  return commands.data;
};

export const setCommands = async (commands: TelegramCommand[]) => {

  const method = 'setMyCommands';
  const url = `${baseUrl}${token}/${method}?commands=${JSON.stringify(commands)}`;

  console.log({ url, commands });

  await axios.get(url);
}

export const sendButtons = async (chat_id: number, type: CallbackQueryType) => {

  const method = 'sendMessage';

  let buttons;
  let text;

  switch (type) {
    case 'sourceLanguage': {
      text = 'Please select a source language';
      buttons = [
        [
          generateButton('English', 'targetLanguage', 'English'),
          generateButton('Spanish', 'targetLanguage', 'Spanish'),
          generateButton('German', 'targetLanguage', 'German')
        ]
      ];
      break;
    }
    case 'targetLanguage': {
      text = 'Please select a target language';
      buttons = [
        [
          generateButton('English', 'topic', 'English'),
          generateButton('Spanish', 'topic', 'Spanish'),
          generateButton('German', 'topic', 'German')
        ]
      ];
      break;
    }
    case 'topic': {
      text = 'Please select a topic';
      buttons = [
        [
          generateButton('Seasons', 'end', 'true'),
          generateButton('Months', 'end', 'true'),
          generateButton('Days', 'end', 'true')
        ]
      ];
      break;
    }

    default: {
      await sendMessage(chat_id, 'We are done here kiddo!');
      return;
    }
  }

  const url = `${baseUrl}${token}/${method}`;

  await axios({
    method: 'post',
    url,
    data: {
      chat_id,
      text,
      reply_markup: { inline_keyboard: buttons }
    }
  })
}