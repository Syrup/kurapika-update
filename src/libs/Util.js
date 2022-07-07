"use strict";
exports.__esModule = true;
var discord_js_1 = require("discord.js");
function paginated(msg, embeds, _a) {
    var timeout = _a.timeout;
    var next = new discord_js_1.MessageButton()
        .setCustomId("next")
        .setStyle("SECONDARY")
        .setEmoji("➡️")
        .setDisabled(false);
    var prev = new discord_js_1.MessageButton()
        .setCustomId("previous")
        .setStyle("SECONDARY")
        .setEmoji("⬅️");
    var nextDisabled = new discord_js_1.MessageButton()
        .setCustomId("next")
        .setStyle("SECONDARY")
        .setEmoji("➡️")
        .setDisabled();
    var prevDisabled = new discord_js_1.MessageButton()
        .setCustomId("previous")
        .setStyle("SECONDARY")
        .setEmoji("⬅️")
        .setDisabled();
    console.log(timeout);
    var row = new discord_js_1.MessageActionRow()
        .addComponents(next, prev);
    var rowDisabled = new discord_js_1.MessageActionRow()
        .addComponents(nextDisabled, prevDisabled);
    var filter = function (i) { return ["prev", "next"].includes(i.customId); };
    var page = 0;
    // let col = await msg.channel.send({ embeds: embeds, content: content ? content : "" })
}
