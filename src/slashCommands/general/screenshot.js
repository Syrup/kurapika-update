const { MessageAttachment } = require("discord.js")
const fetch = require("node-superfetch")
const URL = require("url")

module.exports = {
  conf: {
    name: "screenshot",
    description: "Screenshot webpage",
    global: true,
    category: "General",
    options: [{
      run(opt) {
        return opt
          .setName("url")
          .setDescription("Url to screenshot")
          .setRequired(true)
      },
      type: "string"
    }]
  },
    async fetchNSFWSites() {
		const { text } = await fetch.get(
			'https://raw.githubusercontent.com/blocklistproject/Lists/master/porn.txt'
		);
		let NSFWSites = text
			.split('\n')
			.filter(site => site && !site.startsWith('#'))
			.map(site => site.replace(/^(0.0.0.0 )/, '')); // eslint-disable-line no-control-regex
		return NSFWSites;
    },
  async run(client, message) {
    await message.deferReply()
    try {
      const parse = await this.fetchNSFWSites()
      let url = message.options.getString("url")
      url = /^(https?:\/\/)/i.test(url) ? url : `http://${url}`;
      const parsed = URL.parse(url)
      if(parse.some(u => u === parsed.host) && !message.channel.nsfw) return message.editReply("You're not on the NSFW channel!")
      const { body } = await fetch.get(`https://image.thum.io/get/width/1920/crop/620/noanimate/${url}`)
      // console.log(body)

      const attachment = new MessageAttachment()
      .setFile(body)
        .setName(`screenshot_${message.user.username}.png`)

      message.editReply({ files: [attachment] })
      
    } catch (e) {
      message.editReply(e.toString())
      if(!e.status === 404)
        console.error(e)
    }
  },
}