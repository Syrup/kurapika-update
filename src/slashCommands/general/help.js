const { MessageEmbed } = require("discord.js")

module.exports = {
  conf: {
    name: "help",
    description: "Show How To Command or Show Command List",
    category: 'General',
    global: true,
    options: [{
      run(opt) {
        return opt
          .setName("command")
          .setDescription("Command Name")
      },
      type: "string"
    }]
  },
  run(client, message) {
    let commandName = message.options.getString("command") || ""
    let commands = client.commands
    const embed = new MessageEmbed()
      .setColor("#fff62e")
      .setTimestamp()
      .setFooter({
        text: "Type \`/help command: commandName\` to see command details"
      })
    if(!commandName) {
      embed
      .setTitle("Kurapika Help")
      .setThumbnail(client.user.displayAvatarURL({ type: "png" }))
      .setDescription("Kurapika is a member of the Kurta tribe who were massacred by the Phantom Troupe (The Spiders) 4 years prior the Hunter exam.")
      let categories = [...new Set(commands.map(x => x.conf.category))]
      
      for(let category of categories) {
        let cmd = commands.filter(x => x.conf.category === category && x.conf.global)
        if(category === "Fun") category = "<a:rainbow_wtf:929755507487551528> | " + category
        else if(category === "Moderator") category = "<a:Pepe_Ban:929994955429142538>  | " + category
        // console.log(cmd.map(x => x.conf.name).join("\n"))
        // elseif(category === ""
        embed.addField(category,
                       cmd.map(x => `\`${x.conf.name}\``).join(" - ")
        )
      }
      
      message.reply({ embeds: [embed] })
    } else {
      let command = commands.get(commandName)

      if(!command) return message.reply(`What? No results for \`${commandName}\`\nTry \`/help\` to see a list of commands`)
 
      embed
        .setDescription(command.conf.description)
        .setTitle(`Help: ${command.conf.name}`)
        .addFields([{
          name: "Example",
          value: command.conf.example ? x.conf.example.join("\n") : "None"
        }, {
          name: "Usage",
          value: command.conf.usage ? command.conf.usage.join("\n") : "None"
        }])

      message.reply({ embeds: [embed] })
    }
  }
}