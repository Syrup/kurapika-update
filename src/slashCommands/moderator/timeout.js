const { MessageEmbed } = require("discord.js")
const ms = require("ms");

module.exports = {
  conf: {
    name: "timeout",
    description: "timeout-ed someone who annoying/breaking/problem with your server",
    category: "Moderator",
    global: true,
    options: [{
      run(opt) {
        return opt
          .setName("user")
          .setDescription("Who?")
          .setRequired(true)
      },
      type: "user"
    }, {
      run(opt) {
        return opt
          .setName("time")
          .setDescription("How long? (write in words or in ms. Example: 1 minute/60000)")
          .setRequired(true)   
      },
      type: "string"
    }, {
      run(opt) {
        return opt
          .setName("reason")
          .setDescription("give a reason why you timeout-ed that person?")
      },
      type: "string"
    }]
  },
  run(client, message) {
    try {
    let user = message.options.getUser("user")
    let time = message.options.getString("time")
    let reason = message.options.getString("reason") || "none"
    let member = message.guild.members.resolve(user)
    if(message.guild.me.roles.highest.position <= member.roles.highest.position) return message.reply("Sorry, I don't have enough permissions to do this on that user <a:pepeSadRain:940161281359503401> ")
    let timems = ms(time)
    // console.log(timems, Number(timems))
    if(!timems) return message.reply("Can you give me a valid time?")
    if(timems > 2419200000) return message.reply("The maximum time is only 28 days ^^, this is default from discord 😗")
    else if(timems <= 1000) return message.reply("Are you serious? cannot be less than or equal to 1 second")
    const embed = new MessageEmbed()
      .setTitle(`🚫 | Timeout-ed ${member.user.tag}`)
      .setDescription(`Timeout-ed ${user} for ${ms(timems)}\nReason: \`${reason}\``)
      .setColor("RED")
    member.timeout(timems, reason)
    message.reply({ embeds: [embed] })
      } catch (e) {
      message.reply(e.toString())
      }
  }
}