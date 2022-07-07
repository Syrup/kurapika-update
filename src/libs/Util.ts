import { ButtonInteraction, Message } from "discord.js"
import { MessageEmbed, MessageButton, MessageActionRow } from "discord.js";

/**
* Create paginated embed
* @param msg {Message} - Discord.js Message
* @param embeds {MessageEmbed[]} - Discord.js Embeds
* @param [options=] {({ timeout: number, content: string })} - Optional
* @returns {Message}
*/
export async function paginated(msg: Message, embeds: MessageEmbed[], options: { timeout?: number, content?: string } = { timeout: 15_000, content: "" }) {
	const next = new MessageButton()
	.setCustomId("next")
	.setStyle("SECONDARY")
	.setEmoji("➡️")
	.setDisabled(false)
	const prev = new MessageButton()
	.setCustomId("prev")
	.setStyle("SECONDARY")
	.setEmoji("⬅️")
	const nextDisabled = new MessageButton()
	.setCustomId("next")
	.setStyle("SECONDARY")
	.setEmoji("➡️")
	.setDisabled()
	const prevDisabled = new MessageButton()
	.setCustomId("prev")
	.setStyle("SECONDARY")
	.setEmoji("⬅️")
	.setDisabled()
	let page = 0
	let timeout = options?.timeout ? options?.timeout : 15_000

	let row = new MessageActionRow()
	.addComponents(prev, next)
	let rowDisabled = new MessageActionRow()
	.addComponents(prevDisabled, nextDisabled)


	let content = options?.content ? options.content + `\nPage ${page + 1} of ${embeds.length} pages` : `\nPage ${page + 1} of ${embeds.length} pages`
	let filter = (i: ButtonInteraction) => ["prev", "next"].includes(i.customId)

	let m = await msg.channel.send({ embeds: [embeds[page]], content, components: [row] })

	let col = m.createMessageComponentCollector({ filter, time: timeout })

	col.on("collect", async (btn: ButtonInteraction) => {
		if(btn.customId === "next") {
			page = page > 0 ? --page : embeds.length - 1
		}
		
		if(btn.customId === "prev") {
			page = page + 1 < embeds.length ? ++page : 0
		}


	let content = options?.content ? options.content + `\nPage ${page + 1} of ${embeds.length} pages` : `\nPage ${page + 1} of ${embeds.length} pages`

		await btn.deferUpdate()
		await btn.editReply({ embeds: [embeds[page]], components: [row], content })
		col.resetTimer()
	})

	col.on("end", () => {
		if(m.editable) {
			m.edit({
				embeds: [embeds[page]],
				components: [rowDisabled],
				content
			})
		}
	})

	return m
}
