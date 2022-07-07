import { ApplyOptions } from "@sapphire/decorators";
import { Args, Command } from "@sapphire/framework"
import { Message } from "discord.js";
import { inspect } from "util"
import { send } from "@sapphire/plugin-editable-commands"

@ApplyOptions<Command.Options>({
	description: "Eval command only for dev",
	name: "eval",
	aliases: ["ev", "e"],
	preconditions: ["DevOnly"],
	quotes: [],
	flags: ["async", "silent"],
	options: ["depth"]
})
class EvalCommand extends Command {
	public override async messageRun(msg: Message, args: Args) {
		let code = await args.rest("string")
		let isAsync = args.getFlags("async")
		let isSilent = args.getFlags("silent")
		let depth = Number(args.getOption("depth")) ?? 0
		const startTime = msg.createdTimestamp

		try {
            // eslint-disable-next-line no-eval
            let result = eval(isAsync ? `(async()=>{${code}})()` : code);
            let isResultPromise = false;
            if (result instanceof Promise) {
                result = await result;
                isResultPromise = true;
            }
            if (isSilent) return;
            let inspectedResult = typeof result === "string" ? result : inspect(result, { depth });
            if (isResultPromise) {
                inspectedResult = `Promise<${typeof result === "string" ? inspect(inspectedResult) : inspectedResult}>`;
            }
            inspectedResult = this.clean(inspectedResult);
            await send(msg, `\`\`\`js\n${inspectedResult}\`\`\`\n**\`⏱️ ${Date.now() - startTime}ms\`**`);
        } catch (e) {
            await send(msg, `${`\`\`\`js\n${e}\`\`\``}\n**\`⏱️ ${Date.now() - startTime}ms\`**`);
        }
	}

	private clean(result: string): string {
    return result
		  .replace(new RegExp(process.env.TOKEN!, "gi"), "[REDACTED]");
	}
}

export default EvalCommand
