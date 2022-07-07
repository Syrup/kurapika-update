import { SapphireClient } from "@sapphire/framework"
import { container } from "@sapphire/framework"

class KuraClient extends SapphireClient {
	constructor() {
		super({
			defaultPrefix: "ku.",
			intents: ["GUILDS", "GUILD_MESSAGES"]
		})

		container.config = require("../config")
		container.util = require("./Util")
	}

	/** Start the bot */
	start() {
		void this.login(process.env.TOKEN)
	}
}

export default KuraClient

declare module "@sapphire/pieces" {
	interface Container {
		config: import("../config").KuraConfig;
		util: typeof import("./Util");
	}
}
