import { sendMessage, sendButtons } from './services/telegram-service';
import { CallbackQueryType, TelegramEvent } from './types/Telegram';

import type { HttpFunction } from '@google-cloud/functions-framework/build/src/functions';

export const telegramLanguageBot: HttpFunction = async (req, res) => {

  try {



    const body: TelegramEvent = req.body;
    const message: any = body?.message || body?.callback_query?.message;
    const chatId = message.chat.id;
    const from = message.from;

    console.log(JSON.stringify({ user: from, body: body, chatId: chatId }));

    const isBotCommand = body?.message?.entities?.find(entity => entity.type === 'bot_command')
      ? true
      : false;

    const isCallbackQuery = body?.callback_query
      ? true
      : false;

    // bot command
    if (isBotCommand) {
      await sendButtons(chatId, 'sourceLanguage');
    }
    else if (isCallbackQuery) {

      const callbackQueryData = JSON.parse(body?.callback_query?.data as string);

      // we will use this one later
      const value = callbackQueryData.value;

      const type = callbackQueryData.type as CallbackQueryType;

      await sendButtons(chatId, type);
    }
    // text message
    else {
      await sendMessage(chatId, 'Wtf are you doing?');
    }

    res.status(200);
    res.send(JSON.stringify({ message: 'Success!' }));

  } catch (error) {
    console.log('DEBUG ERROR', error);
    res.status(500);
    res.send(JSON.stringify({ message: 'Error!', error }));
  }
};