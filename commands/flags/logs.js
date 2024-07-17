const { SlashCommandBuilder } = require('discord.js');
const api = require("../../configuration/api.json")
const axios = require("axios");
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('logs')
		.setDescription('Get a list of the logs'),
	async execute(interaction) {
		const response = await axios.get(`${api.url}/api/logs`)
        const data = response.data.data
        console.log(response.data, data)
        const description = data.map(flag => {
            return flag.message
        })
        
        const Embed = new EmbedBuilder()
        .setTitle("Logs")
        .setDescription((await Promise.all(description)).join("\n"))

        interaction.reply({ content: "Here are the logs!", embeds: [Embed] })
	},
};