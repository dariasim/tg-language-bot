import { sendMessage, sendButtons } from '../services/telegram-service';
import { CallbackQueryType, TelegramEvent } from '../types/Telegram';

export const handler = async (event) => {

  try {

    // debug info
    const body: TelegramEvent = JSON.parse(event.body);
    console.log('DEBUG EVENT', JSON.stringify(body));

    const message: any = body?.message || body?.callback_query?.message;
    const chatId = message.chat.id;

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

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success!' })
    };

  } catch (error) {
    console.log('DEBUG ERROR', error);
    return { statusCode: 200 };
  }
};