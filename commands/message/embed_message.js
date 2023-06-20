const { SlashCommandBuilder, PermissionFlagsBits  } = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
                .setName('embed_message')
                .setDescription('Envoyer un message formatté')
                .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
};



