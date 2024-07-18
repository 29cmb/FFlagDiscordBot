const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const api = require("../../configuration/api.json")
const axios = require("axios");
const logs = require('../../configuration/logs.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unlock')
		.setDescription('Unlock a flag')
        .addStringOption(o => 
            o.setName("name").setDescription("The flag to unlock").setRequired(true)
        ),
    permissions: [PermissionsBitField.Flags.ManageGuild],
	async execute(interaction) {
        await interaction.deferReply()
        const flag = interaction.options.getString("name")

		axios.post(`${api.url}/api/unlock`, {
            flag
        }).then(async response => {
            interaction.editReply({ content: "Flag unlocked successfully!", ephemeral: true })
            if(logs.logFlagChanges){
                const channel = await interaction.client.channels.cache.find(id => id.id == logs.channelID)
                if(channel){
                    channel.send(`🚩 A flag has been changed\n\nChanged by <@${interaction.user.id}>\nFlags changed:\n\`\`\`\n${flag}: 🔒 -> 🔓\`\`\``)
                }
            }
        }).catch(e => {
            interaction.editReply({ content: `There was an error unlocking your flag: ${e.response.data.message}`, ephemeral: true })
        })
	},
};