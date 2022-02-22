require("dotenv").config()

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs");
const { CLIENT_ID, GUILD_ID } = require("../config.json");
let {TOKEN} = require("../config.json");

let d;
let conf;

setInterval(() => d = Math.random(), 500)

TOKEN = TOKEN ? TOKEN : process.env.TOKEN

module.exports = async (client) => {
  // console.log(client.commands)
  const rest = new REST({ version: '9' }).setToken(TOKEN);
  const commands = [];
  // const comm
  
  const dirs = fs.readdirSync(__dirname+"/../slashCommands")
  for(let dir of dirs) {
    if(dir.endsWith(".")) return
    let files = fs.readdirSync(__dirname+`/../slashCommands/${dir}`)
    for(let file of files) {
      if(!file.endsWith(".js")) return
      let cmd = require(`../slashCommands/${dir}/${file}`)
      // if(cmd.conf.notSlash) return 
      // comm = cmd
      client.commands.set(cmd.conf.name, cmd)
      conf = cmd.conf
      
      let builder = new SlashCommandBuilder()
      .setName(cmd.conf.name)
      .setDescription(cmd.conf.description)
      if(cmd.conf.options) {
        for(let opt of cmd.conf.options) {
          // builder.addStringOption(opt.run)
          if(opt.type === "string") builder.addStringOption(opt.run)
          else if(opt.type === "number") builder.addIntegerOption(opt.run)
          else if(opt.type === 'integer') builder.addNumberOption(opt.run)
          else if(opt.type === "subcommand") builder.addSubcommandOption(opt.run)
          else if(opt.type === 'boolean') builder.addBooleanOption(opt.run)
          else if(opt.type === "channel") builder.addChannelOption(opt.run)
          else if(opt.type === 'mentionable') builder.addMentionableOption(opt.run)
          else if(opt.type === 'user') builder.addUserOption(opt.run)
          else if(opt.type === "role") builder.addRoleOption(opt.run)
        }
      }
        commands.push(builder.toJSON())
        
    }
  }

  try {
    console.log('Started refreshing application (/) commands.');
      await rest.put(
        Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
        { body: commands },
      );
    if(conf.global) {
      await rest.put(
        Routes.applicationCommands(CLIENT_ID),
        { body: commands }
      )
    }
      commands.forEach(command => console.log(`Load /${command.name}`))

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
}
