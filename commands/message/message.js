const { SlashCommandBuilder, ChannelType, PermissionFlagsBits, CommandInteractionOptionResolver } = require('discord.js');
CommandInteractionOptionResolver
module.exports = {
	data: new SlashCommandBuilder()
		.setName('message')
		.setDescription('Provides information about the server.')
        .addChannelOption(channel => {
            return channel
                .setName('dst_channel')
                .setDescription('Enter the destination channel')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)})
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
        const dst_channel = interaction.options.getChannel('dst_channel', true, ChannelType.GuildText)
        dst_channel.send("Hello");
        await interaction.reply({ content: 'Message envoyé', ephemeral: true });
	},
};



