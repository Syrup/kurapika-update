const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
const yes = new MessageButton()
  .setCustomId("yes")
  .setLabel("✅")
  .setStyle("SUCCESS")
const no = new MessageButton()
  .setCustomId("no")
  .setLabel("🚫")
  .setStyle("DANGER")
const row = new MessageActionRow()
  .addComponents(yes, no)
  
const deadYes = new MessageButton()
  .setCustomId("yes")
  .setLabel("✅")
  .setStyle("SUCCESS")
  .setDisabled()
  
const deadNo = new MessageButton()
  .setCustomId("no")
  .setLabel("🚫")
  .setStyle("DANGER")
  .setDisabled()
  
const deadRow = new MessageActionRow()
  .addComponents(deadYes, deadNo)

module.exports = {
  conf: {
    name: "kick",
    description: "Kick user who annoying your server",
    category: "Moderator",
    global: true,
    options: [{
      run(opt) {
        return opt
          .setName("member")
          .setDescription("Who??")
          .setRequired(true)
      },
      type: "user"
    }, {
      run(opt) {
        return opt
          .setName("reason")
          .setDescription("Would you like to include a reason?")
          // .setRequired(true)
      },
      type: "string"
   }]
  },
  async run(client, msg, args) {
    // msg.reply(`${member} - ${reason.value}`)
    let reason = "No Reason"
  
    if(args.reason) reason = args.reason.value
    if(args.member) member = args.member.member
    let embed = new MessageEmbed()
      .setTitle(`Kick ${member.user.tag}?`)
      .setDescription(`Do you really want to kick ${member}\nWith reason: ${reason}?`)
      .setColor("RANDOM")
      .setFooter({
        text: `${msg.user.tag} want to kick ${member.user.tag}?`,
        iconUrl: msg.user.displayAvatarURL({ format: "png", dynamic: true })
                 })
      .setTimestamp()
    
    let m = await msg.reply({ fetchReply: true, embeds: [embed], components: [row] })

    let filter = btn => ["yes", "no"].includes(btn.customId) && btn.user.id === msg.user.id
    let col = await m.createMessageComponentCollector({ filter, time: 15e3 })

    col.on("collect", async btn => {
      if(btn.user.id !== msg.user.id){
        return msg.followUp({ content: "This button not for you!", ephemeral: true })
      } else {
        if(btn.customId === "yes") {
          if(msg.guild.me.roles.highest.position < msg.member.roles.highest.position || msg.user.id === msg.guild.ownerId) {            col.stop()
            return msg.followUp({ content: "My position is not higher than that user <a:pepeSadRain:940161281359503401> ", ephemeral: true })
          }
          col.stop()
          await member.kick(reason)
          return msg.followUp(`${member.tag} kicked from ${msg.guild}`)
        } else {
          col.stop()
          return msg.followUp({ content: `Not being kicked user ${member}`, ephemeral: true })
        }
      }
    })
  

    col.on("end", () => {
      if(!m.deleted) {
        m.edit({ embeds: [embed], components: [deadRow] })
      }
    })
  }
}