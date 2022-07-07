import { ApplyOptions } from "@sapphire/decorators";
import { Command } from "@sapphire/framework"
import type { Message } from "discord.js"

@ApplyOptions<Command.Options>({
	name: "ping",
	aliases: ["p", "pg"],
	description: "Send hi!"
})
class PingCommand extends Command {
	public override async messageRun(msg: Message) {
		msg.reply("Hi")
	}
}

export default PingCommand
