const { SlashCommandBuilder } = require('discord.js');
const api = require("../../configuration/api.json")
const axios = require("axios");
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unlock')
		.setDescription('Unlock a flag')
        .addStringOption(o => 
            o.setName("name").setDescription("The flag to unlock").setRequired(true)
        ),
	async execute(interaction) {
        await interaction.deferReply()
        const flag = interaction.options.getString("name")

		axios.post(`${api.url}/api/unlock`, {
            flag
        }).then(response => {
            interaction.editReply({ content: "Flag unlocked successfully!", ephemeral: true })
        }).catch(e => {
            interaction.editReply({ content: `There was an error unlocking your flag: ${e.response.data.message}`, ephemeral: true })
        })
	},
};