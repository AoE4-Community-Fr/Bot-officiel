const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('site')
		.setDescription('Affiche le lien vers le site de la communauté'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		await interaction.reply(`Retrouvez le **site de la communauté** ici : https://www.ageofempire4.fr`);
	},
};