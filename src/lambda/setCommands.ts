import { setCommands } from '../services/telegram-service';
import { TelegramCommand, TelegramEvent } from '../types/Telegram';

export const handler = async (event) => {

  try {

    // debug info
    console.log('DEBUG EVENT', JSON.stringify(event));

    const body: TelegramEvent = JSON.parse(event.body);
    const chatId = body?.message?.chat?.id;
    const text = body?.message?.text.toLowerCase();

    const commands: TelegramCommand[] = [
      {
        command: 'select_target_language',
        description: 'select_target_language'
      },
      {
        command: 'select_source_language',
        description: 'select_source_language'
      },
      {
        command: 'lala',
        description: 'lala'
      }
    ];

    await setCommands(commands);

  
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success!'})
    };

  } catch (error) {
    console.log('DEBUG ERROR', error);
    return { statusCode: 200 };
  }
};