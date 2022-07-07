import { Precondition } from "@sapphire/framework";
import type { Message } from "discord.js"
import { container } from "@sapphire/framework"

class DevOnlyPrecondition extends Precondition {
	public async run(msg: Message) {
		return ["681843628317868049"].includes(msg.author.id) ? this.ok() : this.error({ message: "Who are you? i only run this command for Developer(s)" })
	}
}

export default DevOnlyPrecondition

declare module "@sapphire/framework" {
	interface Preconditions {
		DevOnly: never;
	}
}
