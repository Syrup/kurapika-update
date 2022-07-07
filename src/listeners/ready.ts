import { ApplyOptions } from "@sapphire/decorators";
import { Listener } from "@sapphire/framework";
import { Client } from "discord.js"

@ApplyOptions<Listener.Options>({
	once: true,
	event: "ready"
})
class ReadyEvent extends Listener {
	/* public constructor(context: Listener.Context, options: Listener.Options) {
		super(context, {
			...options,
			once: true,
			event: "ready"
		})
	} */

	public run(client: Client) {
		this.container.logger.info(`${client.user!.tag} ready!`)
		// console.log(`${client.user!.tag} Ready!`)
	}
}

export default ReadyEvent
