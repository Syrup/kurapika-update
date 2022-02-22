const { Client, Intents, Collection } = require("discord.js")
const fs = require("fs")

class KurapikaClient extends Client {
  constructor(...args) {
    super({
      intents: ["GUILDS", "GUILD_MESSAGES"],
      ...args
    })

    this.util = new (require("./KurapikaUtil.js"))()

    this.commands = new Collection()
    // console.log(this.commands)
  }
  
}

module.exports = KurapikaClient;