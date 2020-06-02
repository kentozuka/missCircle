const line = require('@line/bot-sdk')
const { lineDt } = require('../config')
const client = new line.Client(lineDt.secrets)

module.exports.replyEvent = async function (event) {
  if (event.type !== 'message' || event.message.type !== 'text') return Promise.resolve(null)
  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  })
}

module.exports.pushEvent = async function (text) {
  await client.pushMessage(lineDt.userId, {
    type: 'text',
    text: text
  })
}
