const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const api = require("../../configuration/api.json")
const axios = require("axios");
const logs = require('../../configuration/logs.json');
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
    permissions: [PermissionsBitField.Flags.ManageGuild],
	async execute(interaction) {
        await interaction.deferReply()
        const flag = interaction.options.getString("name")
        var value = interaction.options.getString("value")
        if(value == "true") value = true
        if(value == "false") value = false

		axios.post(`${api.url}/api/create`, {
            flag, value
        }).then(async response => {
            interaction.editReply({ content: "Flag created successfully!", ephemeral: true })
            if(logs.logFlagChanges){
                const channel = await interaction.client.channels.cache.find(id => id.id == logs.channelID)
                if(channel){
                    channel.send(`🚩 A flag has been changed\n\nChanged by <@${interaction.user.id}>\nFlags changed:\n\`\`\`\n${flag}: None -> ${typeof value == "boolean" ? (value == true ? "✅" : "❌") : value} (Created)\n\`\`\``)
                }
            }
        }).catch(e => {
            interaction.editReply({ content: `There was an error making your flag: ${e.response.data.message}`, ephemeral: true })
        })
	},
};