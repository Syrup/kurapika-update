module.exports = {
  name: "ready",
  run(client) {
    // console.log(require("@discordjs/builders"))
    client.user.setActivity(`Global ${client.commands.filter(x => x.conf.global).size} Commands | Beta ${client.commands.filter(x => !x.conf.global).size} Commands`, { type: "WATCHING" })
    client.user.setStatus("idle")
    console.log(`Loaded ${client.commands.size} commands`)
    console.log(`Logged in as ${client.user.tag}!`);
  }
}