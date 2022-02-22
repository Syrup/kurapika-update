exports.run = async (client, interaction) => {
  if(!interaction.isCommand()) return
  // if(d < 0.4) interaction.channel.send("Please vote me!")
  const cmd = client.commands.get(interaction.commandName)
  const options = interaction.options.data
  const args = {}
  options.forEach(v => args[v.name] = v)
  if(interaction.commandName === cmd.conf.name) {
    try {
      // console.log(args)
      cmd.run(client, interaction, args)
    } catch (e) {
      interaction.reply(e.toString())
      console.log(e)
    }
  }
}

exports.name = "interactionCreate"