const { SlashCommandBuilder } = require('discord.js');
const api = require("../../configuration/api.json")
module.exports = {
	data: new SlashCommandBuilder()
		.setName('clearlogs')
		.setDescription('Clear all of the logs'),
	async execute(interaction) {
		axios.post(`${api.url}/api/clearLogs`, {
        }).then(async response => {
           interaction.reply("Logs have been cleared")
        }).catch(e => {
            interaction.editReply({ content: `There was an error making your flag: ${e.response.data.message}`, ephemeral: true })
        })
	},
};