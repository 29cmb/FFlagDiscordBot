const { SlashCommandBuilder } = require('discord.js');
const api = require("../../configuration/api.json")
const axios = require("axios");
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create')
		.setDescription('Create a new flag')
        .addStringOption(o => 
            o.setName("name").setDescription("Name that the flag will have").setRequired(true)
        )
        .addStringOption(o =>
            o.setName("value").setDescription("Value that the flag will have").setRequired(true)
        ),
	async execute(interaction) {
        await interaction.deferReply()
        const flag = interaction.options.getString("name")
        var value = interaction.options.getString("value")
        if(value == "true") value = true
        if(value == "false") value = false

		axios.post(`${api.url}/api/create`, {
            flag, value
        }).then(response => {
            interaction.editReply({ content: "Flag created successfully!", ephemeral: true })
        }).catch(e => {
            interaction.editReply({ content: `There was an error making your flag: ${e.response.data.message}`, ephemeral: true })
        })
	},
};