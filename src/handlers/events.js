const fs = require("fs");

module.exports = (client) => {
  const events = fs.readdirSync(__dirname+"/../"+"/events")
  for(let event of events) {
    let ev = require(`../events/${event}`)
    
    client.on(ev.name, (...args) => {
      ev.run(client, ...args)
    })
  }
}