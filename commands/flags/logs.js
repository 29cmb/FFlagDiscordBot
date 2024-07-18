const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const api = require("../../configuration/api.json")
const axios = require("axios");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('logs')
		.setDescription('Get a list of the logs'),
    permissions: [PermissionsBitField.Flags.ManageMessages],
	async execute(interaction) {
		const response = await axios.get(`${api.url}/api/logs`)
        const data = response.data.data
        console.log(response.data, data)
        const description = data.map(flag => {
            return flag.message
        })
        
        const Embed = new EmbedBuilder()
        .setTitle("Logs")
        var desc = (await Promise.all(description)).join("\n")
        if(desc == '') desc = "*No logs to display*"
        Embed.setDescription(desc)

        interaction.reply({ content: "Here are the logs!", embeds: [Embed] })
	},
};