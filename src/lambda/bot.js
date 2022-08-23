const axios = require('axios');

const baseUrl = 'https://api.telegram.org/bot';
const token = '';


const sendMessage = async (chatId, text) => {

  const method = 'sendMessage';
  const url = `${baseUrl}${token}/${method}?chat_id=${chatId}&text=${encodeURI(text)}`;

  await axios.get(url);
};

module.exports.handler = async (event) => {

  try {

    // debug info
    console.log('DEBUG EVENT', JSON.stringify(event));

    const body = JSON.parse(event.body);
    const chatId = body?.message?.chat?.id;
    const text = body?.message?.text.toLowerCase();

    await sendMessage(chatId, text);

    return { statusCode: 200 };

  } catch (error) {
    console.log('DEBUG ERROR', error);
    return { statusCode: 200 };
  }
};