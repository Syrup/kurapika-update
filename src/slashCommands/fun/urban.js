const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const axios = require("axios");
const { MessageEmbed } = require("discord.js")
const { MessageActionRow, MessageButton } = require('discord.js');
// const color = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');


exports.run = async (client, message) => {
  await message.deferReply()
  const term = message.options.getString("text")
  // const query = new URLSearchParams({ term })
  // console.log(query)
  const res = await axios.get(`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(term)}`)
  let { list } = res.data;

  if(!list.length) return message.editReply("No result found for "+term)

  
  list = list[0]
  const row = new MessageActionRow()
  .addComponents(
    new MessageButton()
    .setLabel("Visit")
    .setStyle("LINK")
    .setURL(list.permalink)
  )
  const date = new Date(list.written_on)
  .toISOString()
  .replace(/T/, ' ')
  .replace(/\..+/, '')
  // console.log(list)

  const embed = new MessageEmbed()
  .setColor("RANDOM")//client.util.randomColor())
  .setTitle(list.word)
  .setAuthor(list.author)
  .setURL(list.permalink)
  .setDescription(list.definition)
  .addFields([{
    name: "Example",
    value: list.example,
    inline: true
  }, {
    name: "Written on",
    value: `\`${date}\``,
    inline: true
  }])
  .setFooter(`👍 ${list.thumbs_up} | 👎 ${list.thumbs_down}`)
  
  // message.editReply(`**${term}**\n\n${list.definition}`)
  message.editReply({ embeds: [embed], components: [row] })
}

exports.conf = {
  name: "urban",
  description: "Search Urban Dictionary",
  options: [{
    run(opt) {
      return opt
        .setName("text")
        .setDescription("Text to Search")
        .setRequired(true)
    },
    type: 'string'
  }],
  category: "Fun",
  global: true
}