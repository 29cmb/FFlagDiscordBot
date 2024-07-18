const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const api = require("../../configuration/api.json")
const axios = require("axios");
const logs = require("../../configuration/logs.json") 

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
    permissions: [PermissionsBitField.Flags.ManageGuild],
	async execute(interaction) {
        await interaction.deferReply()
        const flag = interaction.options.getString("name")
        var value = interaction.options.getString("value")
        if(value == "true") value = true
        if(value == "false") value = false

		axios.post(`${api.url}/api/set`, {
            flag, value
        }).then(async response => {
            interaction.editReply({ content: "Flag value has been changed successfully!", ephemeral: true })
            if(logs.logFlagChanges){
                const channel = await interaction.client.channels.cache.find(id => id.id == logs.channelID)
                if(channel){
                    channel.send(`🚩 A flag has been changed\n\nChanged by <@${interaction.user.id}>\nFlags changed:\n\`\`\`\n${flag}: ${typeof response.data.old == "boolean" ? (response.data.old == true ? "✅" : "❌") : response.data.old} -> ${typeof value == "boolean" ? (value == true ? "✅" : "❌") : value}\`\`\``)
                }
            }
        }).catch(e => {
            try {
                interaction.editReply({ content: `There was an error setting your flag value: ${e.response.data.message}`, ephemeral: true })
            } catch(err) {
                console.log(e, err)
                interaction.editReply({ content: "ERR_UNHANDLED_CONTACT_DEV "})
            }
        })
	},
};