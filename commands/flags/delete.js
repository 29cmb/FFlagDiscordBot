const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const api = require("../../configuration/api.json")
const axios = require("axios");
const { EmbedBuilder } = require('@discordjs/builders');
const logs = require('../../configuration/logs.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('Delete a flag')
        .addStringOption(o => 
            o.setName("name").setDescription("Flag to delete").setRequired(true)
        ),
    permissions: [PermissionsBitField.Flags.ManageGuild],
	async execute(interaction) {
        await interaction.deferReply()
        const flag = interaction.options.getString("name")

		axios.post(`${api.url}/api/delete`, {
            flag
        }).then(async response => {
            const old = await response.data.old
            interaction.editReply({ content: "Flag value has deleted successfully!", ephemeral: true })
            if(logs.logFlagChanges){
                const channel = await interaction.client.channels.cache.find(id => id.id == logs.channelID)
                if(channel){
                    channel.send(`🚩 A flag has been changed\n\nChanged by <@${interaction.user.id}>\nFlags changed:\n\`\`\`\n${flag}: ${typeof old == "boolean" ? (old == true ? "✅" : "❌") : old} -> None (Deleted)\n\`\`\``)
                }
            }
        }).catch(e => {
            interaction.editReply({ content: `There was an error deleting your flag: ${e.response.data.message}`, ephemeral: true })
        })
	},
};