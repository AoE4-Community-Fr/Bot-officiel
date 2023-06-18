const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, ChannelType, InteractionType } = require('discord.js');
const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds], disableEveryone: false });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		client.commands.set(command.data.name, command);
	}
}

client.on(Events.InteractionCreate, async interaction => {

	if (interaction.type === InteractionType.ApplicationCommand) {
		const command = interaction.client.commands.get(interaction.commandName);

		if (interaction.commandName === "message") {


			const modal = new ModalBuilder()
				.setCustomId('Modal_Message')
				.setTitle('Nouveau message');

			/* const channel = new ChannelSelectMenuBuilder({
				custom_id: 'dst_channel',
			})
			.setChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
 */
			const message = new TextInputBuilder()
				.setCustomId('classicMessage')
				.setLabel("Rediger un message classic")
				.setRequired(false)
				.setStyle(TextInputStyle.Paragraph);

			const firstActionRow = new ActionRowBuilder().addComponents(message);

			// Add inputs to the modal
			modal.addComponents(firstActionRow);

			// Show the modal to the user
			await interaction.showModal(modal);
		} else if (interaction.commandName === "embed_message") {
			const modalEmbed = new ModalBuilder()
				.setCustomId('Modal_embedMessage')
				.setTitle('Nouveau message formatté');

			const embededMessageAuthor = new TextInputBuilder()
				.setCustomId('embededMessageAuthor')
				.setLabel("Quel est l'auteur du message formatté")
				.setRequired(false)
				.setStyle(TextInputStyle.Short);

			const embededMessageAuthorIcone = new TextInputBuilder()
				.setCustomId('embededMessageAuthorIcon')
				.setLabel("Quel est l'icone de l'auteur")
				.setRequired(false)
				.setStyle(TextInputStyle.Short);

			const embededMessageTitle = new TextInputBuilder()
				.setCustomId('embededMessageTitle')
				.setLabel("Quel est le titre du message formaté")
				.setRequired(false)
				.setStyle(TextInputStyle.Short);

			const embededMessage = new TextInputBuilder()
				.setCustomId('embededMessage')
				.setLabel("Rediger à la suite un message formaté")
				.setRequired(true)
				.setStyle(TextInputStyle.Paragraph);

			const embededMessageImage = new TextInputBuilder()
				.setCustomId('image')
				.setLabel("Image principale")
				.setRequired(false)
				.setStyle(TextInputStyle.Short);

			const firstActionRow = new ActionRowBuilder().addComponents(embededMessageAuthor);
			const secondActionRow = new ActionRowBuilder().addComponents(embededMessageAuthorIcone);
			const thirdActionRow = new ActionRowBuilder().addComponents(embededMessageTitle);
			const fourthActionRow = new ActionRowBuilder().addComponents(embededMessage);
			const firthActionRow = new ActionRowBuilder().addComponents(embededMessageImage);

			modalEmbed.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, firthActionRow);

			await interaction.showModal(modalEmbed);

		} else if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		} else {

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({ content: 'Une erreur s\'est produite lors de l\'exécution de cette commande !', ephemeral: true });
				} else {
					await interaction.reply({ content: 'Une erreur s\'est produite lors de l\'exécution de cette commande !', ephemeral: true });
				}
			}
		}
	} else if (interaction.type === InteractionType.ModalSubmit) {
		if (interaction.customId === 'Modal_Message') {
			const classicMesage = interaction.fields.getTextInputValue('classicMessage');

			interaction.channel.send(classicMesage);
			interaction.reply({ content: 'Message envoyé', ephemeral: true });
		}
		else if (interaction.customId === 'Modal_embedMessage') {
			const author = interaction.fields.getTextInputValue('embededMessageAuthor');
			const authorIcon = interaction.fields.getTextInputValue('embededMessageAuthorIcon');
			let Author = 'AOE 4 - Communauté FR';
			let icon = 'https://raw.githubusercontent.com/AoE4-Community-Fr/Assets/master/Logo_serveur.png'

			if (!(author === '' || author === 'AOE 4 - Communauté FR')) {
				Author = author;
				icon = authorIcon;
			}

			const title = interaction.fields.getTextInputValue('embededMessageTitle');
			const message = interaction.fields.getTextInputValue('embededMessage');
			const image = interaction.fields.getTextInputValue('image');


			const embed = new EmbedBuilder()
				.setColor(0x7a7ae0)
				.setTitle(title)
				.setAuthor({ name: Author, iconURL: icon })
				.setDescription(message)

			if (image !== '')
			{
				embed.setImage(image)
			}
			
			interaction.channel.send({ embeds: [embed] });
			interaction.reply({ content: 'Message envoyé', ephemeral: true });
		}
	}

});

client.on('threadCreate', post => {

	const ForumBO_Id = "1080894013550366730";
	const ForumCommu_Id = "1081740810195832852";
	const AnnounceChannel_Id = "1080504576328880151";
    if (post.parentId === ForumBO_Id && post.type === ChannelType.PublicThread)
    {
		const NotifBO_Id = "1110631444432306288";
        const AnnounceChannel = client.channels.cache.get(AnnounceChannel_Id);
        AnnounceChannel.send("||<@" + NotifBO_Id + ">||\nOyé, oyé, bande de troubadours assoiffés de BO. <@" + post.ownerId + "> vient de nous sortir un nouveau breuvage baptisé ***" + post.name + 
                                "***, servez-vous dans vos auges et abreuvez-vous de ce savoir : <#" + post.id + ">")
    }
	else if (post.parentId === ForumCommu_Id && post.type === ChannelType.PublicThread)
	{
		const AnnounceChannel = client.channels.cache.get(AnnounceChannel_Id);
		AnnounceChannel.send("||<@" + NotifBO_Id + ">||\nOyé, oyé, bande de troubadours assoiffés de BO. <@" + post.ownerId + "> vient de nous sortir un nouveau breuvage baptisé ***" + post.name +
			"***, servez-vous dans vos auges et abreuvez-vous de ce savoir : <#" + post.id + ">")
	}
	else if (post.parentId === ForumCommu_Id && post.type === ChannelType.PublicThread) {
		const AnnounceChannel = client.channels.cache.get(AnnounceChannel_Id);
		AnnounceChannel.send("La communauté vient de poster un nouveau thread intitulé <#" + post.id + "> dans <#" + post.parentId + "> hésite pas à aller voir et à donner ton avis !")
	}
})


client.on("ready", () => {
	console.log("bot operatrionnel");
})

client.login(token);