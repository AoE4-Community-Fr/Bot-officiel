const { SlashCommandBuilder, PermissionFlagsBits  } = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
                .setName('message')
                .setDescription('Envoyer un message avec le bot')
                .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

};



