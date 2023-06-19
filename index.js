const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, ChannelType } = require('discord.js');
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
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

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
        AnnounceChannel.send("La communauté vient de poster un nouveau thread intitulé <#" + post.id + "> dans <#" + post.parentId + "> hésite pas à aller voir et à donner ton avis !")
	}
})


client.on("ready", () => {
    console.log("bot operatrionnel");  
})

client.login(token);