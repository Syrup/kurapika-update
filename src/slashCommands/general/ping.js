const { CLIENT_ID } = require("../../config.json");
const axios = require("axios");

exports.run = async (client, message) => {
  message.reply({ content: "Pong! :ping_pong:", ephemeral: true })
  let msg = await message.channel.send("Ping...")
  let ping = Math.round(msg.createdTimestamp - message.createdTimestamp)

  setTimeout(() =>  {
    message.editReply(`:ping_pong: \`${client.ws.ping}\`ms:fire: \`${ping}\`ms`)
  }, 2e3)
  msg.delete()
  // console.log(message)
  message.channel.send("Ping has been executed ||only you ("+message.user.username+"#"+message.user.discriminator+") can see||")
}

exports.conf = {
  name: "ping",
  description: "Send Ping Message",
  category: "General",
  global: true
}