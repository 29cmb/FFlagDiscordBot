const { SlashCommandBuilder } = require('discord.js');
const api = require("../../configuration/api.json")
const axios = require("axios");
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('Delete a flag')
        .addStringOption(o => 
            o.setName("name").setDescription("Flag to delete").setRequired(true)
        ),
	async execute(interaction) {
        await interaction.deferReply()
        const flag = interaction.options.getString("name")

		axios.post(`${api.url}/api/delete`, {
            flag
        }).then(response => {
            interaction.editReply({ content: "Flag value has deleted successfully!", ephemeral: true })
        }).catch(e => {
            interaction.editReply({ content: `There was an error deleting your flag: ${e.response.data.message}`, ephemeral: true })
        })
	},
};