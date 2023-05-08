const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Affiche la latence'),
	async execute(interaction) {
		await interaction.reply(`La latence est de \`${Date.now() - interaction.createdTimestamp}ms\``);
	},
};