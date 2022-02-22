require("dotenv").config()

const Client = require("./cores/KurapikaClient");
const client = new Client();
const http = require("http");
const { AutoPoster } = require('topgg-autoposter')

// Later... if Intents are available
// const ap = AutoPoster(process.env.DBL, client)

// ap.on('posted', () => {
//   console.log('Posted stats to Top.gg!')
// })


require("./handlers/slash")(client);
require("./handlers/events")(client)

http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain"
  })
  res.end("Hello? Why do you here??")
}).listen(process.env.PORT || 3000)

client.login(process.env.TOKEN);