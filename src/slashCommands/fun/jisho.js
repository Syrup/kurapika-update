const axios = require("axios")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
  conf: {
    name: "jisho",
    category: "Fun",
    description: "Search Japanese-English Dictionary",
    global: true,
    options: [{
      run(opt) {
        // console.log(opt)
        return opt
          .setName("text")
          .setDescription("Text to search")
          .setRequired(true)
      },
      type: "string"
    }],
  },
  async run(client, message) {
    try {
    await message.deferReply()
    let text = message.options.getString("text")
    let query = new URLSearchParams({ keyword: text })

    let { data } = await axios.get(`https://jisho.org/api/v1/search/words?${query}`) 
    //console.log(res.data)
    let res = data.data[0]
    
  if(!data.data.length) return message.editReply(`No result for ${text}`)
  let title = res.japanese
  .map(x => `${x.reading}\n————\n${x.word || " "}`)[0]
  let description = res.senses[0]
    .info.join("\n")
  let definitions = res.senses[0]
  .english_definitions.join("\n")
  let embed = new MessageEmbed()
  .setTitle(title)
  .setColor("RANDOM")
  .setDescription(description)
  .addFields([{
    name: "Definitons",
    value: definitions
  }])

  message.editReply({ embeds: [embed] })
    } catch (e) {
      message.editReply({ content: e.toString() })
    }
    
  }
  
}