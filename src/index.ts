import "dotenv/config"
import "@sapphire/plugin-editable-commands/register"
import KuraClient from "./libs/Client"

const client = new KuraClient()

client.start()
