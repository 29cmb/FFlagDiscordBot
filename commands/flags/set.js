const { SlashCommandBuilder } = require('discord.js');
const api = require("../../configuration/api.json")
const axios = require("axios");
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set')
		.setDescription('Modify the value of a flag')
        .addStringOption(o => 
            o.setName("name").setDescription("Name of the flag to modify").setRequired(true)
        )
        .addStringOption(o =>
            o.setName("value").setDescription("New value of the flag").setRequired(true)
        ),
	async execute(interaction) {
        await interaction.deferReply()
        const flag = interaction.options.getString("name")
        var value = interaction.options.getString("value")
        if(value == "true") value = true
        if(value == "false") value = false

		axios.post(`${api.url}/api/set`, {
            flag, value
        }).then(response => {
            interaction.editReply({ content: "Flag value has been changed successfully!", ephemeral: true })
        }).catch(e => {
            interaction.editReply({ content: `There was an error setting your flag value: ${e.response.data.message}`, ephemeral: true })
        })
	},
};