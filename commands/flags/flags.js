const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const api = require("../../configuration/api.json")
const axios = require("axios");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('flags')
		.setDescription('Get a list of flags and their values'),
	async execute(interaction) {
		const response = await axios.get(`${api.url}/api/flags`)
        const data = response.data.data
        const description = data.map(flag => {
            return `${flag.locked == true ? "🔒 " : ""}\`${flag.flag}\`: ${typeof flag.value == "boolean" ? (flag.value === true ? "✅" : "❌") : flag.value}`
        })
        
        const Embed = new EmbedBuilder()
        .setTitle("Flags")
        var desc = (await Promise.all(description)).join("\n")
        if(desc == '') desc = "*No flags to display*"
        Embed.setDescription(desc)

        interaction.reply({ content: "Here are the flags!", embeds: [Embed] })
	},
};