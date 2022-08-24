type EntityType = 'bot_command';

type TelegramEntity = {
  offset: number,
  lenght: number,
  type: EntityType
};

type TelegramChat = {
  id: number,
  first_name: string,
  last_name: string,
  username: string,
  type: string
};

type TelegramFrom = {
  id: number,
  is_bot: boolean,
  first_name: string,
  last_name: string,
  username: string,
  language_code: string
};

type TelegramMessage = {
  message_id: number,
  from: TelegramFrom,
  chat: TelegramChat,
  date: number,
  text: string,
  entities: TelegramEntity[]
};

export type CallbackQueryType = 'sourceLanguage' | 'targetLanguage' | 'topic' | 'end';

export type TelegramCallbackQuery = {
  id: string,
  from: TelegramFrom,
  message: TelegramMessage,
  chat_instance: string,
  data: string
}

export interface TelegramEvent {
  update_id: number,
  callback_query?: TelegramCallbackQuery,
  message?: TelegramMessage
};

export interface TelegramCommand {
  command: string,
  description: string
};