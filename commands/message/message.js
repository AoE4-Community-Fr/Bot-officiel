const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('message')
		.setDescription('Provides information about the server.')
        .addChannelOption(option =>
            option.setName('destination channel')
                .setDescription('Enter the destination channel'))
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
        const dst_channel = interaction.option.getChannel('destination channel')

		// interaction.guild is the object representing the Guild in which the command was run
		
	},
};

const { Events, ModalBuilder, TextInputBuilder } = require('discord.js');

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
    if (!interaction.isModalSubmit()) return;
	    console.log(interaction);

	if (interaction.commandName === 'message') {
		const modal = new ModalBuilder()
			.setCustomId('Modal')
			.setTitle('Nouveau message');

            const message = TextInputBuilder()
                .setCustomId('classicMessage')
                .setLabel("Rediger un message classic")
                .setStyle(TextInputStyle.Paragraph);

            const embededMessage = new TextInputBuilder()
                .setCustomId('embededMessage')
                .setLabel("Rediger à la suite un message formaté")
                // Paragraph means multiple lines of text.
                .setStyle(TextInputStyle.Paragraph);

            const firstActionRow = new ActionRowBuilder().addComponents(message);
            const secondActionRow = new ActionRowBuilder().addComponents(embededMessage);
        
            // Add inputs to the modal
            modal.addComponents(firstActionRow, secondActionRow);
        
            // Show the modal to the user
            await interaction.showModal(modal);

		// TODO: Add components to modal...
	}
});