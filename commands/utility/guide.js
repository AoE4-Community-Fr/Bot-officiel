const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('guide')
		.setDescription('Affiche le lien vers le guide pour débutant'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		await interaction.reply(`Retrouvez le **guide pour débutant** ici : https://www.ageofempire4.fr/docs/guide/introduction`);
	},
};