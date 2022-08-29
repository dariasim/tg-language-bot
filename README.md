# tg-language-bot

Telegram bot to memorise words in new languages

## get started

```bash
# install dependencies
npm install

# set telegram token environment variable (.env)

# start a local server
npm run start

# deploy to google cloud
npm run deploy

```

## setup webhook for telegram bot
curl --request POST --url https://api.telegram.org/bot<API_KEY>/setWebhook --header 'content-type: application/json' --data '{"url": "<ENDPOINT>"}'
