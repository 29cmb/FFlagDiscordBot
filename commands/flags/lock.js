const { SlashCommandBuilder } = require('discord.js');
const api = require("../../configuration/api.json")
const axios = require("axios");
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lock')
		.setDescription('Lock a flag')
        .addStringOption(o => 
            o.setName("name").setDescription("The flag to lock").setRequired(true)
        ),
	async execute(interaction) {
        await interaction.deferReply()
        const flag = interaction.options.getString("name")

		axios.post(`${api.url}/api/lock`, {
            flag
        }).then(response => {
            interaction.editReply({ content: "Flag locked successfully!", ephemeral: true })
        }).catch(e => {
            interaction.editReply({ content: `There was an error locking your flag: ${e.response.data.message}`, ephemeral: true })
        })
	},
};