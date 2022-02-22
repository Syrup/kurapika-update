const { MessageActionRow, MessageButton, CommandInteraction, Message, MessageEmbed } = require("discord.js")

class KurapikaUtil {
  constructor(client) {
    this.client = client
  }

  /**
   * Message Button Paginator.
   * @param {CommandInteraction} msg - Command Interaction
   * @param {Array.<MessageEmbed>} pages - Embeds to be used for the paginator
   * @param {number} [time=18000] - Time to stop. default: 18000
   */
  async paginator(msg, pages, time = 18e3) {
    let page = 0;
    const btn1 = new MessageButton()
      .setCustomId("previous")
      .setLabel("⬅️")
      .setStyle("SUCCESS")
    const btn2 = new MessageButton()
      .setCustomId("next")
      .setLabel("➡️")
      .setStyle("SUCCESS")
    const row = new MessageActionRow()
      .addComponents(
        btn1,
        btn2
      )
    const deadBtn1 = new MessageButton()
      .setCustomId("previous")
      .setLabel("⬅️")
      .setStyle("SUCCESS")
      .setDisabled()
    const deadBtn2 = new MessageButton()
      .setCustomId("next")
      .setLabel("➡️")
      .setStyle("SUCCESS")
      .setDisabled()
    const deadRow = new MessageActionRow()
      .addComponents(
        deadBtn1,
        deadBtn2
      )
    
    let m = await msg.reply({ embeds: [pages[0]], components: [row], fetchReply: true })
    // console.log(m)
    let filter = btn => ["previous", "next"].includes(btn.customId) && btn.user.id === msg.user.id
    let col = await m.createMessageComponentCollector({ filter, time })
    
    col.on("collect", btn => {
      // console.log(btn)
      // btn.deferReply()
      
      if(btn.user.id !== msg.user.id) {
        // if(msg instanceof CommandInteraction){
          msg.followUp({ content: "This button not for you!", ephemeral: true })
        // } else return
      }
      
      if(btn.customId === "previous") {
        page = page > 0 ? --page : pages.length - 1
      }
      
      if(btn.customId === "next") {
        page = page + 1 < pages.length ? ++page : 0
      }
      
      m.edit({ embeds: [pages[page]], components: [row] })
    })
    
    col.on("end", () => {
      if(!m.deleted) {
        m.edit({ embeds: [pages[page]], components: [deadRow] })
      }
    })
    
    return m
  }

  /**
   * Chunk an Array
   * @param {Array.} arr - An Array
   * @param {number} size - Size for chunk array
   */
  chunk(arr, size) {
    const temp = [];
    for (let i = 0; i < arr.length; i += size) {
      temp.push(arr.slice(i, i + size));
    }
    return temp;
  }
}

module.exports = KurapikaUtil