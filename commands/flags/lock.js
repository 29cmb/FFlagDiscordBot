const { SlashCommandBuilder } = require('discord.js');
const api = require("../../configuration/api.json")
const axios = require("axios");
const { EmbedBuilder } = require('@discordjs/builders');
const logs = require('../../configuration/logs.json');
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
        }).then(async response => {
            interaction.editReply({ content: "Flag locked successfully!", ephemeral: true })
            if(logs.logFlagChanges){
                const channel = await interaction.client.channels.cache.find(id => id.id == logs.channelID)
                if(channel){
                    channel.send(`🚩 A flag has been changed\n\nChanged by <@${interaction.user.id}>\nFlags changed:\n\`\`\`\n${flag}: 🔓 -> 🔒\n\`\`\``)
                }
            }
        }).catch(e => {
            interaction.editReply({ content: `There was an error locking your flag: ${e.response.data.message}`, ephemeral: true })
        })
	},
};